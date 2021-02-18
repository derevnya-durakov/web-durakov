<template>
  <div class="top-layout">
    <player-panel
      v-for="opponent in opponents"
      :key="opponent.user.id"
      :model="opponent"
      :action-icon="getActionIcon(opponent)"
    />
  </div>
  <div class="middle-layout">
    <div></div>
    <div>
      <card-deck
        :deck-size="deckSize"
        :trump-card="lastTrump"
        :card-width="125"
        :card-height="175"
      />
    </div>
  </div>
  <div class="bottom-layout">
    <player-panel
      v-if="myPlayer !== null"
      :model="myPlayer"
      :action-icon="getActionIcon(myPlayer)"
    />
    <hand-dock
      :cards="myHand"
      :trump-suit="trumpSuit"
      @card-clicked="doGameAction"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

import CardDeck from '@/components/CardDeck.vue';
import HandDock from '@/components/HandDock.vue';
import PlayerPanel from '@/components/PlayerPanel.vue';
import { ActionIcon } from '@/enums';
import { useAttackMutation, useGameUpdatedSubscription, useGetGameStateQuery } from '@/graphql/api';
import Card from '@/model/Card';
import Player from '@/model/Player';
import State from '@/store/State';

export default defineComponent({

  name: 'Game',

  components: {
    CardDeck,
    HandDock,
    PlayerPanel,
  },

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    const { getGameState } = useGetGameStateQuery(_store);
    useGameUpdatedSubscription(_store, getGameState as any);
    const _attacker = computed(() => _store.getters.attacker);
    const _defender = computed(() => _store.getters.defender);
    const myPlayer = computed(() => _store.getters.myPlayer);
    const { attack: _attack } = useAttackMutation(_store);
    return {
      loggedIn: computed(() => _store.getters.loggedIn),
      loggedInUser: computed(() => _store.state.loggedInUser),
      myHand: computed(() => _store.getters.myHand),
      myPlayer,
      opponents: computed(() => _store.getters.opponents),
      deckSize: computed(() => _store.state.gameState?.deckSize || 0),
      lastTrump: computed(() => _store.state.gameState?.lastTrump || null),
      trumpSuit: computed(() => _store.state.gameState?.trumpSuit || null),
      navigateToLogin() {
        _router.push({ name: 'login' });
      },
      getActionIcon(player: Player): ActionIcon | null {
        if (player === _attacker.value) {
          return ActionIcon.Attack;
        } else if (player === _defender.value) {
          return ActionIcon.Defence;
        } else {
          return null;
        }
      },
      doGameAction(card: Card) {
        if (myPlayer.value === _attacker.value) {
          _attack({ gameId: _store.state.gameId, attack: { suit: card.suit, rank: card.rank } });
        }
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
.top-layout {
  display: flex;
  justify-content: center;
}
.middle-layout {
  display: grid;
  grid-template-columns: auto 300px;
}
.bottom-layout {
  display: grid;
  grid-template-columns: 230px auto;
  position: absolute;
  bottom: 0%;
  width: 100%
}
</style>
