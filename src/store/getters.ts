import { GetterTree } from 'vuex';

import Card from '@/model/Card';
import State from '@/store/State';

const getters: GetterTree<State, State> = {

  loggedIn({ accessToken, loggedInUser }: State): boolean {
    return ((accessToken !== null) && (loggedInUser !== null));
  },

  myHand({ gameState }: State): Card[] {
    return ((gameState !== null) ? gameState.hand : []);
  },

};

export default getters;
