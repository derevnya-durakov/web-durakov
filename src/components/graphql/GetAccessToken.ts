import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import { SET_ACCESS_TOKEN } from '@/store/mutation-types';

const GetAccessToken = defineComponent({

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
    );
    const _accessToken = useResult(result);
    watch(_accessToken, () => {
      _store.commit(SET_ACCESS_TOKEN, _accessToken.value);
    });
  },

  render: () => null,

});

export default GetAccessToken;
