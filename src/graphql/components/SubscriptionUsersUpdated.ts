import { useSubscription } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';

import { getContext } from '@/graphql/api';
import { ADD_USER } from '@/store/mutation-types';
import State from '@/store/State';

export default defineComponent({

  name: 'SubscriptionUsersUpdated',

  setup() {
    const _store = useStore<State>();
    const { result } = useSubscription(gql`
      subscription onUsersUpdated {
        usersUpdated {
          name
          user {
            id
            nickname
          }
        }
      }`,
      null,
      { context: getContext(_store.state.accessToken) },
    );
    watch(
      result,
      (data) => {
        _store.commit(ADD_USER, data.usersUpdated.user);
      },
      { immediate: false },
    );
  },

  render: () => null,

});
