<template>
  <input v-model="nickname" type="text">
  <button @click="login">Login</button>
  <graphql-get-access-token
    v-if="committedNickname"
    :nickname="committedNickname"
  />
  <graphql-authenticate
    v-if="store.state.accessToken"
    :access-token="store.state.accessToken"
    @authenticated="router.push({ name: 'game' })"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import GraphqlAuthenticate from '@/components/graphql/Authenticate';
import GraphqlGetAccessToken from '@/components/graphql/GetAccessToken';

const Login = defineComponent({

  components: {
    GraphqlAuthenticate,
    GraphqlGetAccessToken,
  },

  setup() {
    return {
      router: useRouter(),
      store: useStore(),
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
    if (this.store.state.loggedInUser) {
      this.router.push({ name: 'game' });
    }
  },

});

export default Login;
</script>
