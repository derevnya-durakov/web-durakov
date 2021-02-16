<template>
  <h1>Game</h1>
  <h2>You are logged in as</h2>
  <i v-if="loggedInUser">
    {{ loggedInUser.nickname }} (id: {{ loggedInUser.id }})
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

import State from '@/store/State';

export default defineComponent({

  name: 'Game',

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    return {
      loggedIn: computed(() => _store.getters.loggedIn),
      loggedInUser: computed(() => _store.state.loggedInUser),
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
