import { useSubscription } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';

import { getContext } from '@/graphql/api';
import State from '@/store/State';

export default defineComponent({

  name: 'SubscriptionGameUpdated',

  setup() {
    const _store = useStore<State>();
    const { result } = useSubscription(
      gql`
        subscription onGameUpdated($gameId: ID!) {
          gameUpdated(id: $gameId) {
            name
          }
        }
      `,
      { gameId: _store.state.gameId },
      { context: getContext(_store.state.accessToken) },
    );
    watch(
      result,
      data => {
        console.log(JSON.stringify(data));
      },
      { immediate: false },
    );
  },

  render: () => null,

});
