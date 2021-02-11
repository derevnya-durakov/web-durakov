<template>
  <input v-model="nickname" type="text">
  <button @click="add">Add</button>
  <ul>
    <li v-for="player in players" :key="player.id">{{player.nickname}}</li>
  </ul>
  <query-get-all-players v-if="loggedIn"/>
  <subscription-players-updated v-if="loggedIn"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { useAddPlayerMutation } from '@/graphql/api';
import QueryGetAllPlayers from '@/graphql/components/QueryGetAllPlayers';
import SubscriptionPlayersUpdated from '@/graphql/components/SubscriptionPlayersUpdated';
import State from '@/store/State';

export default defineComponent({
  
  name: 'Users',

  components: {
    QueryGetAllPlayers,
    SubscriptionPlayersUpdated,
  },

  setup() {
    const _router = useRouter();
    const _store = useStore<State>();
    return {
      gotoLogin() {
        _router.push({ name: 'login' });
      },
      ...useAddPlayerMutation(_store),
      loggedIn: computed(() => _store.getters.loggedIn),
      players: computed(() => _store.state.players),
    };
  },

  data() {
    return {
      nickname: '',
    };
  },

  methods: {
    add() {
      this.addPlayer({ nickname: this.nickname });
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
