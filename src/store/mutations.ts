import { MutationTree } from 'vuex';

import { SET_ACCESS_TOKEN, SET_LOGGED_IN_USER } from '@/store/mutation-types';
import State from '@/store/State';

import Player from '@/models/Player';

const mutations: MutationTree<State> = {

  [SET_ACCESS_TOKEN](state: State, accessToken: string): void {
    state.accessToken = accessToken;
  },

  [SET_LOGGED_IN_USER](state: State, loggedInUser: Player): void {
    state.loggedInUser = loggedInUser;
  },

};

export default mutations;
