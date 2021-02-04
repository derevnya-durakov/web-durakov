import { GetterTree } from 'vuex';

import State from '@/store/State';

const getters: GetterTree<State, State> = {

  loggedIn({ accessToken, loggedInUser }: State): boolean {
    return ((accessToken !== null) && (loggedInUser !== null));
  },

};

export default getters;
