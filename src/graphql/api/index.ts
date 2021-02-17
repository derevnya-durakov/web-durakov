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

export function useAddUserMutation(store: Store<State>) {
  const { mutate: addUser } = useMutation(
    gql`
      mutation addUser($nickname: String!) {
        addUser(nickname: $nickname) {
          id
          nickname
        }
      }
    `,
    { context: getContext(store.state.accessToken) },
  );
  return { addUser };
}
