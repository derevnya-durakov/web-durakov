import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';

import { getContext } from '@/composable/graphql';
import { SET_LOGGED_IN_USER } from '@/store/mutation-types';
import State from '@/store/State';

const EVENT_AUTHENTICATED = 'authenticated';

export default defineComponent({

  name: 'QueryAuthenticate',

  emits: [ EVENT_AUTHENTICATED ],

  setup(_props, { emit }) {
    const _store = useStore<State>();
    const { result } = useQuery(
      gql`
        query authenticate {
          auth {
            user {
              id
              nickname
            }
          }
        }
      `,
      null,
      {
        fetchPolicy: 'no-cache',
        context: getContext(_store.state.accessToken),
      },
    );
    const _user = useResult(result, null, data => data.auth.user);
    watch(_user, value => {
      _store.commit(SET_LOGGED_IN_USER, value);
      emit(EVENT_AUTHENTICATED);
    });
  },

  render: () => null,

});
