import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import { SET_PLAYERS } from '@/store/mutation-types';
import State from '@/store/State';

export default defineComponent({

  name: 'QueryGetAllPlayers',

  setup() {
    const _store = useStore<State>();
    const { result } = useQuery(
      gql`
        query getAllPlayers {
          players {
            id
            nickname
          }
        }
      `,
      null,
      {
        fetchPolicy: 'no-cache',
        context: {
          headers: { 'X-Auth-Token': _store.state.accessToken },
        },
      },
    );
    const _players = useResult(result);
    watch(_players, value => {
      _store.commit(SET_PLAYERS, value);
    });
  },

  render: () => null,

});
