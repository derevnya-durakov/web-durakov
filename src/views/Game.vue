<template>
  <div class="top-layout">
    <player-panel
      v-for="opponent in opponents"
      :key="opponent.user.id"
      :model="opponent"
      :action-icon="getActionIcon(opponent)"
    />
  </div>
  <div class="bottom-layout">
    <player-panel
      v-if="myPlayer !== null"
      :model="myPlayer"
      :action-icon="getActionIcon(myPlayer)"/>
    <hand-dock :cards="myHand" :trump-suit="trumpSuit"/>
  </div>
  <subscription-game-updated v-if="loggedIn"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

import HandDock from '@/components/HandDock.vue';
import PlayerPanel from '@/components/PlayerPanel.vue';
import { ActionIcon } from '@/enums';
import { useGetGameStateQuery } from '@/graphql/api';
import SubscriptionGameUpdated from '@/graphql/components/SubscriptionGameUpdated';
import Player from '@/model/Player';
import State from '@/store/State';

export default defineComponent({

  name: 'Game',

  components: {
    HandDock,
    PlayerPanel,
    SubscriptionGameUpdated,
  },

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    useGetGameStateQuery(_store);
    const _attacker = computed(() => _store.getters.attacker);
    const _defender = computed(() => _store.getters.defender);
    return {
      loggedIn: computed(() => _store.getters.loggedIn),
      loggedInUser: computed(() => _store.state.loggedInUser),
      myHand: computed(() => _store.getters.myHand),
      myPlayer: computed(() => _store.getters.myPlayer),
      opponents: computed(() => _store.getters.opponents),
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
.bottom-layout {
  display: grid;
  grid-template-columns: 230px auto;
  position: absolute;
  bottom: 0%;
  width: 100%
}
</style>
