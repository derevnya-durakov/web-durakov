import { MutationTree } from 'vuex';

import { GameState, User } from '@/domain';
import { ADD_USER, SET_ACCESS_TOKEN, SET_GAME_STATE, SET_LOGGED_IN_USER, SET_USERS } from '@/store/mutation-types';
import State from '@/store/State';

const mutations: MutationTree<State> = {

  [SET_ACCESS_TOKEN](state: State, accessToken: string): void {
    state.accessToken = accessToken;
  },

  [SET_LOGGED_IN_USER](state: State, loggedInUser: User): void {
    state.loggedInUser = loggedInUser;
  },

  [SET_USERS](state: State, users: User[]): void {
    state.users = users;
  },

  [ADD_USER]({ users }: State, user: User): void {
    users.push(user);
  },

  [SET_GAME_STATE](state: State, gameState: GameState): void {
    console.log('setting game state...');
    state.gameState = gameState;
  },

};

export default mutations;
