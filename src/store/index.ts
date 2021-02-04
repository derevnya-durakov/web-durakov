import { createStore } from 'vuex';

import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import State from '@/store/State';

export default createStore({
  state: new State(),
  mutations,
  actions,
  getters,
  modules: {
  },
});
