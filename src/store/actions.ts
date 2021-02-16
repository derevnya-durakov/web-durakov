import { ActionContext, ActionTree } from 'vuex';

import { LOGOUT } from '@/store/action-types';
import { SET_ACCESS_TOKEN, SET_LOGGED_IN_USER } from '@/store/mutation-types';
import State from '@/store/State';

const actions: ActionTree<State, State> = {

  [LOGOUT]({ commit }: ActionContext<State, State>): void {
    commit(SET_ACCESS_TOKEN, null);
    commit(SET_LOGGED_IN_USER, null);
  },

};

export default actions;
