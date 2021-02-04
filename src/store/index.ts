import { createStore } from 'vuex';

import mutations from '@/store/mutations';
import State from '@/store/State';

export default createStore({
  state: new State(),
  mutations,
  actions: {
  },
  modules: {
  },
});
