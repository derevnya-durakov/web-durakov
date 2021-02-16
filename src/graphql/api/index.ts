import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { Store } from 'vuex';

import State from '@/store/State';

export function getContext(headerXAuthToken: string | null): ConnectionParams {
  return {
    headers: { 'X-Auth-Token': headerXAuthToken || '' },
  };
}

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
    { context: getContext(store.state.accessToken) },
  );
  return { addPlayer };
}
