import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import { SET_LOGGED_IN_USER } from '@/store/mutation-types';

const EVENT_AUTHENTICATED = 'authenticated';

const Authenticate = defineComponent({

  emits: [ EVENT_AUTHENTICATED ],

  props: {
    accessToken: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const _store = useStore();
    const { result } = useQuery(
      gql`
        query authenticate($accessToken: String!) {
          auth(accessToken: $accessToken) {
            player {
              id
              nickname
            }
          }
        }
      `,
      props,
    );
    const _player = useResult(result, null, data => data.auth.player);
    watch(_player, () => {
      _store.commit(SET_LOGGED_IN_USER, _player.value);
      emit(EVENT_AUTHENTICATED);
    });
  },

  render: () => null,

});

export default Authenticate;
