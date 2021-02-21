<template>
  <div class="layout-vertical">
    <div class="top-layout">
      <player-panel
        v-for="opponent in opponents"
        :key="opponent.user.id"
        :model="opponent"
        :action-icon="getActionIcon(opponent)"
        :is-taking="isTaking(opponent)"
      />
    </div>
    <div class="middle-layout">
      <div class="round">
        <round-pair
          v-for="(roundPair, index) in round"
          class="round-pair"
          :key="index"
          :model="roundPair"
        />
      </div>
      <div>
        <card-deck :deck-size="deckSize" :trump-card="lastTrump"/>
      </div>
    </div>
    <div class="bottom-layout">
      <div class="relative-container">
        <div class="grid-container">
          <player-panel
            v-if="myPlayer !== null"
            :model="myPlayer"
            :action-icon="getActionIcon(myPlayer)"
            :is-taking="isTaking(myPlayer)"
          />
          <hand-dock
            :cards="myHand"
            :trump-suit="trumpSuit"
            @card-click="doGameAction"
          />
        </div>
        <div class="actions">
          <button v-if="iCanSayBeat" @click="doSayBeat">Бито!</button>
          <button v-if="iCanTake" @click="doTake">Беру!</button>
          <button v-if="iCanRelease" @click="doRelease">Бери!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

import CardDeck from '@/components/CardDeck.vue';
import HandDock from '@/components/HandDock.vue';
import PlayerPanel from '@/components/PlayerPanel.vue';
import RoundPair from '@/components/RoundPair.vue';
import { ActionIcon } from '@/enums';
import {
  useAttackMutation,
  useDefendMutation,
  useGameUpdatedSubscription,
  useGetGameStateQuery,
  useSayBeatMutation,
  useTakeMutation,
} from '@/graphql/api';
import Card, { beats } from '@/model/Card';
import Player from '@/model/Player';
import State from '@/store/State';

export default defineComponent({

  name: 'Game',

  components: {
    CardDeck,
    HandDock,
    PlayerPanel,
    RoundPair,
  },

  setup() {
    const _store = useStore<State>();
    useGetGameStateQuery(_store);
    useGameUpdatedSubscription(_store);
    const _router = useRouter();
    const _attacker = computed(() => _store.getters.attacker);
    const _defender = computed(() => _store.getters.defender);
    const _iAmAttacker = computed(() => _store.getters.iAmAttacker);
    const _iAmDefender = computed(() => _store.getters.iAmDefender);
    const _firstCardToDefend = computed(() => _store.getters.firstCardToDefend);
    const _availableRanksForAttack = computed(() => _store.getters.availableRanksForAttack);
    const _anyCardOnTable = computed(() => _store.getters.anyCardOnTable);
    const _allAttacksAreBeaten = computed(() => _store.getters.allAttacksAreBeaten);
    const myPlayer = computed(() => _store.getters.myPlayer as Player | null);
    const { attack: _attack } = useAttackMutation(_store);
    const { defend: _defend } = useDefendMutation(_store);
    const { sayBeat: _sayBeat } = useSayBeatMutation(_store);
    const { take: _take } = useTakeMutation(_store);
    const _iCanAttackWith = (card: Card) => (
      (_availableRanksForAttack.value.length === 0)
      || _availableRanksForAttack.value.includes(card.rank)
    );
    const _iCanDefendWith = (card: Card) => (
      (_store.state.gameState !== null)
      && (_firstCardToDefend.value !== null)
      && beats(card, _firstCardToDefend.value, _store.state.gameState.trumpSuit)
    );
    const _isTaking = computed(() => (_store.state.gameState?.isTaking || false));
    return {
      loggedIn: computed(() => _store.getters.loggedIn),
      loggedInUser: computed(() => _store.state.loggedInUser),
      myHand: computed(() => _store.getters.myHand),
      myPlayer,
      opponents: computed(() => _store.getters.opponents),
      deckSize: computed(() => _store.state.gameState?.deckSize || 0),
      lastTrump: computed(() => _store.state.gameState?.lastTrump || null),
      trumpSuit: computed(() => _store.state.gameState?.trumpSuit || null),
      round: computed(() => _store.state.gameState?.round || []),
      iCanSayBeat: computed(() => (
        !_iAmDefender.value
        && (!myPlayer.value?.saidBeat || false)
        && _anyCardOnTable.value
        && _allAttacksAreBeaten.value
      )),
      iCanTake: computed(() => (
        _iAmDefender.value
        && !_isTaking.value
        && !_allAttacksAreBeaten.value
      )),
      iCanRelease: computed(() => (
        (_store.state.gameState?.isTaking || false)
        && !_iAmDefender.value
        && (myPlayer.value !== null)
        && (!myPlayer.value.saidBeat || false)
        && (myPlayer.value.handSize > 0)
      )),
      navigateToLogin() {
        _router.push({ name: 'login' });
      },
      getActionIcon(player: Player): ActionIcon | null {
        if (player.user.id === _attacker.value.user.id) {
          return ActionIcon.Attack;
        } else if (player.user.id === _defender.value.user.id) {
          return ActionIcon.Defence;
        } else {
          return null;
        }
      },
      doGameAction(card: Card) {
        if (_iAmAttacker.value) {
          if (_iCanAttackWith(card)) {
            _attack({ gameId: _store.state.gameId, attack: { suit: card.suit, rank: card.rank } });
          }
        } else if (_iAmDefender.value) {
          if (_iCanDefendWith(card)) {
            _defend({
              gameId: _store.state.gameId,
              attack: { suit: _firstCardToDefend.value.suit, rank: _firstCardToDefend.value.rank },
              defence: { suit: card.suit, rank: card.rank },
            });
          }
        } else {
          if (_anyCardOnTable.value && _iCanAttackWith(card)) {
            _attack({ gameId: _store.state.gameId, attack: { suit: card.suit, rank: card.rank } });
          }
        }
      },
      doSayBeat() {
        _sayBeat({ gameId: _store.state.gameId });
      },
      doTake() {
        _take({ gameId: _store.state.gameId });
      },
      doRelease() {
        _sayBeat({ gameId: _store.state.gameId });
      },
      isTaking(player: Player) {
        if (!_store.state.gameState?.isTaking || false) {
          return false;
        }
        return (player.user.id === _defender.value.user.id);
      },
      router: useRouter(),
    };
  },

  created() {
    if (!this.loggedIn) {
      this.navigateToLogin();
    } else {
      console.log('authenticated');
    }
  },

});
</script>

<style lang="scss" scoped>
.layout-vertical {
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  min-height: 100%;
}
.top-layout {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0%;
  width: 100%;
}
.middle-layout {
  display: grid;
  grid-template-columns: auto 300px;
}
.bottom-layout {
  .relative-container {
    position: relative;
    .grid-container {
      display: grid;
      grid-template-columns: 230px auto;
    }
    .actions {
      display: flex;
      justify-content: center;
      width: 100%;
      position: absolute;
      top: -50px;
    }
  }
  position: absolute;
  bottom: 0%;
  width: 100%
}
.round {
  display: flex;
  justify-content: center;
  &-pair {
    margin-top: 10px;
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
