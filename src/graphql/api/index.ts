import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { Store } from 'vuex';

import State from '@/store/State';

export function useAddPlayerMutation(store: Store<State>) {
  const { mutate: addPlayer } = useMutation(
    gql`
      mutation addPlayer($nickname: String!) {
        addPlayer(nickname: $nickname) {
          id
          nickname
        }
      }
    `,
    {
      context: {
        headers: { 'X-Auth-Token': store.state.accessToken },
      },
    },
  );
  return { addPlayer };
}
