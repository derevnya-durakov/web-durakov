import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import { xAuthToken } from '@/apollo-client';
import { SET_ACCESS_TOKEN } from '@/store/mutation-types';

export default defineComponent({

  name: 'QueryGetAccessToken',

  props: {
    nickname: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const _store = useStore();
    const { result } = useQuery(
      gql`
        query getAccessToken($nickname: String!) {
          accessToken(nickname: $nickname)
        }
      `,
      props,
      { fetchPolicy: 'no-cache' },
    );
    const _accessToken = useResult<string | null>(result);
    watch(_accessToken, value => {
      if (value) {
        _store.commit(SET_ACCESS_TOKEN, value);
        xAuthToken.value = value;
      } else {
        _store.commit(SET_ACCESS_TOKEN, null);
        xAuthToken.value = null;
      }
    });
  },

  render: () => null,

});
