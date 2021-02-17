import { MutationTree } from 'vuex';

import { ADD_USER, SET_ACCESS_TOKEN, SET_LOGGED_IN_USER, SET_USERS } from '@/store/mutation-types';
import State from '@/store/State';

import User from '@/models/User';

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

};

export default mutations;
