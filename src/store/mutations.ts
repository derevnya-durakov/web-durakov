import { MutationTree } from 'vuex';

import { ADD_PLAYER, SET_ACCESS_TOKEN, SET_LOGGED_IN_USER, SET_PLAYERS } from '@/store/mutation-types';
import State from '@/store/State';

import Player from '@/models/Player';

const mutations: MutationTree<State> = {

  [SET_ACCESS_TOKEN](state: State, accessToken: string): void {
    state.accessToken = accessToken;
  },

  [SET_LOGGED_IN_USER](state: State, loggedInUser: Player): void {
    state.loggedInUser = loggedInUser;
  },

  [SET_PLAYERS](state: State, players: Player[]): void {
    state.players = players;
  },

  [ADD_PLAYER]({ players }: State, player: Player): void {
    players.push(player);
  },

};

export default mutations;
