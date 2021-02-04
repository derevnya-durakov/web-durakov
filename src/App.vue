<template>
  <nav>
    <button
      v-if="!isCurrentRoute('demo')"
      @click="navigate('demo')"
    >
      Demo
    </button>
    <button
      v-if="!isCurrentRoute('login') && !loggedIn"
      @click="navigate('login')"
    >
      Login
    </button>
    <button v-if="loggedIn" @click="logout">Logout</button>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { LOGOUT } from '@/store/action-types';

const App = defineComponent({

  setup() {
    const _router = useRouter();
    const _store = useStore();
    return {
      loggedIn: computed((): boolean => _store.getters.loggedIn),
      logout() {
        _store.dispatch(LOGOUT);
        _router.push({ name: 'login' });
      },
      isCurrentRoute(routeName: string): boolean {
        return (_router.currentRoute.value.name === routeName);
      },
      navigate(routeName: string): void {
        _router.push({ name: routeName });
      },
    };
  },

});

export default App;
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
