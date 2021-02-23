<template>
  <div class="layout-vertical">
    <div class="top-layout">
      <player-panel
        v-for="opponent in opponents"
        :key="opponent.user.id"
        :model="opponent"
        :action-icon="getActionIcon(opponent)"
        :is-taking="isPlayerTaking(opponent)"
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
            :is-taking="isPlayerTaking(myPlayer)"
          />
          <hand-dock
            :cards="myHand"
            :trump-suit="trumpSuit"
            @card-click="doCardGameAction"
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

import CardDeck from '@/components/CardDeck.vue';
import HandDock from '@/components/HandDock.vue';
import PlayerPanel from '@/components/PlayerPanel.vue';
import RoundPair from '@/components/RoundPair.vue';
import { useGameActions } from '@/composable/game-actions';
import { useAuthComputed, useGameStateComputed } from '@/composable/state-computed';
import { useValidation } from '@/composable/validation';
import { ActionIcon } from '@/enums';

import {
  useAttackMutation,
  useDefendMutation,
  useGameUpdatedSubscription,
  useGetGameStateQuery,
  useSayBeatMutation,
  useTakeMutation,
} from '@/composable/graphql';

import { Player, playersEqual } from '@/domain';
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

    const {
      attacker: _attacker,
      deckSize,
      defender: _defender,
      firstCardToDefend: _firstCardToDefend,
      lastTrump,
      myHand,
      myPlayer,
      opponents,
      round,
      trumpSuit,
    } = useGameStateComputed(_store);

    const {
      anyCardOnTable: _anyCardOnTable,
      iAmAttacker: _iAmAttacker,
      iAmDefender: _iAmDefender,
      iCanAttackWith: _iCanAttackWith,
      iCanDefendWith: _iCanDefendWith,
      iCanRelease,
      iCanSayBeat,
      iCanTake,
      isPlayerTaking,
    } = useValidation(_store, _firstCardToDefend, _defender);

    const { attack: _attack } = useAttackMutation(_store);
    const { defend: _defend } = useDefendMutation(_store);
    const { sayBeat: _sayBeat } = useSayBeatMutation(_store);
    const { take: _take } = useTakeMutation(_store);

    const _router = useRouter();

    return {
      // auth
      ...useAuthComputed(_store),
      // game state
      myHand,
      myPlayer,
      opponents,
      deckSize,
      lastTrump,
      trumpSuit,
      round,
      // validation
      iCanSayBeat,
      iCanTake,
      iCanRelease,
      isPlayerTaking,
      // game actions
      ...useGameActions(
        _store,
        _anyCardOnTable,
        _iAmAttacker,
        _iAmDefender,
        _iCanAttackWith,
        _iCanDefendWith,
        _firstCardToDefend,
        _attack,
        _defend,
        _sayBeat,
        _take,
      ),
      // router
      navigateToLogin() {
        _router.push({ name: 'login' });
      },
      // other
      getActionIcon(player: Player): ActionIcon | null {
        if ((_attacker.value !== null) && playersEqual(player, _attacker.value)) {
          return ActionIcon.Attack;
        } else if ((_defender.value !== null) && playersEqual(player,_defender.value)) {
          return ActionIcon.Defence;
        } else {
          return null;
        }
      },
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
