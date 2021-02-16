<template>
  <input v-model="nickname" type="text">
  <button @click="login">Login</button>
  <query-get-access-token
    v-if="committedNickname"
    :nickname="committedNickname"
  />
  <query-authenticate
    v-if="authToken"
    @authenticated="navigateToGame"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import QueryAuthenticate from '@/graphql/components/QueryAuthenticate';
import QueryGetAccessToken from '@/graphql/components/QueryGetAccessToken';
import State from '@/store/State';

export default defineComponent({

  name: 'Login',

  components: {
    QueryAuthenticate,
    QueryGetAccessToken,
  },

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    return {
      authToken: computed(() => _store.state.accessToken),
      loggedIn: computed(() => _store.getters.loggedIn),
      navigateToGame() {
        _router.push({ name: 'game' });
      },
    };
  },

  data() {
    return {
      nickname: '',
      committedNickname: '',
    };
  },

  methods: {
    login() {
      this.committedNickname = this.nickname;
      this.nickname = '';
    },
  },

  created() {
    if (this.loggedIn) {
      this.navigateToGame();
    }
  },

});
</script>
