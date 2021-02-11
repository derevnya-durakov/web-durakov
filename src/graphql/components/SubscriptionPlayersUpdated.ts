import { useSubscription } from '@vue/apollo-composable';
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';

import { ADD_PLAYER } from '@/store/mutation-types';
import State from '@/store/State';

export default defineComponent({

  name: 'SubscriptionPlayersUpdated',

  setup() {
    const _store = useStore<State>();
    const { result } = useSubscription(gql`
      subscription onPlayersUpdated {
        playersUpdated {
          name
          player {
            id
            nickname
          }
        }
      }`,
      null,
      {
        context: {
          headers: {
            'X-Auth-Token': _store.state.accessToken,
          },
        },
      },
    );
    watch(
      result,
      (data) => {
        _store.commit(ADD_PLAYER, data.playersUpdated.player);
      },
      { immediate: false },
    );
  },

  render: () => null,

});
