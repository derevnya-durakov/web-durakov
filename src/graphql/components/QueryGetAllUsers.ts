import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';

import { getContext } from '@/graphql/api';
import { SET_USERS } from '@/store/mutation-types';
import State from '@/store/State';

export default defineComponent({

  name: 'QueryGetAllUsers',

  setup() {
    const _store = useStore<State>();
    const { result } = useQuery(
      gql`
        query getAllUsers {
          users {
            id
            nickname
          }
        }
      `,
      null,
      {
        fetchPolicy: 'no-cache',
        context: getContext(_store.state.accessToken),
      },
    );
    const _users = useResult(result);
    watch(_users, value => {
      _store.commit(SET_USERS, value);
    });
  },

  render: () => null,

});
