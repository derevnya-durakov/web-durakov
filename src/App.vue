<template>
  <!-- <nav>
    <router-link v-if="!isCurrentRoute('demo')" to="/demo">&lt;Demo&gt;</router-link>
    <router-link v-if="!isCurrentRoute('game')" to="/game">&lt;Game&gt;</router-link>
    <router-link v-if="!isCurrentRoute('users')" to="/users">&lt;Users&gt;</router-link>
    <router-link v-if="!isCurrentRoute('login') && !loggedIn" to="/login">&lt;Login&gt;</router-link>
    <button v-if="loggedIn" @click="logout">Logout</button>
  </nav> -->
  <router-view/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { LOGOUT } from '@/store/action-types';
import State from '@/store/State';

export default defineComponent({

  name: 'App',

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    return {
      loggedIn: computed((): boolean => _store.getters.loggedIn),
      logout() {
        _store.dispatch(LOGOUT)
          .then(() => {
            _router.push({ name: 'login' });
          });
      },
      isCurrentRoute: (routeName: string) => (_router.currentRoute.value.name === routeName),
    };
  },

});
</script>

<style lang="scss">
html, body, #app {
  min-height: 100%;
  height: 100%;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #094c72;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
