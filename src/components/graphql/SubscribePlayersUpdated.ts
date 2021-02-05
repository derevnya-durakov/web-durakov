import { defineComponent, watch } from 'vue';
import { useSubscription } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({

  name: 'SubscribePlayersUpdated',

  setup() {
    const { result } = useSubscription(gql`
      subscription onPlayersUpdated {
      	playersUpdated {
          name
          player {
            id
            nickname
          }
        }
      }
    `);
    watch(
      result,
      (data) => {
        console.log('New message received:', data.value.playersUpdated);
      },
      { immediate: false },
    );
  },

  render: () => null,

});
