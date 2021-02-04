<template>
  <h1>Game</h1>
  <h2>You are logged in as</h2>
  <i v-if="store.state.loggedInUser">
    {{ store.state.loggedInUser.nickname }} (id: {{ store.state.loggedInUser.id }})
  </i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

const Game = defineComponent({

  setup() {
    return {
      router: useRouter(),
      store: useStore(),
    };
  },

  created() {
    if (this.store.state.accessToken === null) {
      this.router.push({ name: 'login' });
    } else {
      console.log('authenticated');
    }
  },

});

export default Game;
</script>
