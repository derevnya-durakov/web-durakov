<template>
  <input v-model="nickname" type="text">
  <button @click="add">Add</button>
  <ul>
    <li v-for="user in users" :key="user.id">{{user.nickname}}</li>
  </ul>
  <query-get-all-users v-if="loggedIn"/>
  <subscription-users-updated v-if="loggedIn"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { useAddUserMutation } from '@/graphql/api';
import QueryGetAllUsers from '@/graphql/components/QueryGetAllUsers';
import SubscriptionUsersUpdated from '@/graphql/components/SubscriptionUsersUpdated';
import State from '@/store/State';

export default defineComponent({
  
  name: 'Users',

  components: {
    QueryGetAllUsers,
    SubscriptionUsersUpdated,
  },

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    return {
      gotoLogin() {
        _router.push({ name: 'login' });
      },
      ...useAddUserMutation(_store),
      loggedIn: computed(() => _store.getters.loggedIn),
      users: computed(() => _store.state.users),
    };
  },

  data() {
    return {
      nickname: '',
    };
  },

  methods: {
    add() {
      this.addUser({ nickname: this.nickname });
      this.nickname = '';
    },
  },

  created() {
    if (!this.loggedIn) {
      this.gotoLogin();
    } else {
      console.log('authenticated');
    }
  },

});
</script>
