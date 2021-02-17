<template>
  <h1>Game</h1>
  <h2>You are logged in as</h2>
  <i v-if="loggedInUser">
    {{ loggedInUser.nickname }} (id: {{ loggedInUser.id }})
  </i>
  <hand-dock :cards="myHand"/>
  <subscription-game-updated v-if="loggedIn"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

import HandDock from '@/components/HandDock.vue';
import { useGetGameStateQuery } from '@/graphql/api';
import SubscriptionGameUpdated from '@/graphql/components/SubscriptionGameUpdated';
import State from '@/store/State';

export default defineComponent({

  name: 'Game',

  components: {
    HandDock,
    SubscriptionGameUpdated,
  },

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    useGetGameStateQuery(_store);
    return {
      loggedIn: computed(() => _store.getters.loggedIn),
      loggedInUser: computed(() => _store.state.loggedInUser),
      myHand: computed(() => _store.getters.myHand),
      navigateToLogin() {
        _router.push({ name: 'login' });
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
