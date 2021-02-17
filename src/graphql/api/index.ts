import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { watch } from 'vue';
import { Store } from 'vuex';

import { SET_GAME_STATE } from '@/store/mutation-types';
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

export function useGetGameStateQuery(store: Store<State>) {
  const { refetch: getGameState, result } = useQuery(
    gql`
      query getGameState($gameId: ID!) {
        getGameState(id: $gameId) {
          id
          nonce
          trumpSuit
          deckSize
          discardPileSize
          hand {
            suit
            rank
          }
          players {
            handSize
            user {
              id
              nickname
            }
          }
          round {
            attack {
              suit
              rank
            }
            defence {
              suit
              rank
            }
          }
          defendingId
        }
      }
    `,
    { gameId: store.state.gameId },
    {
      fetchPolicy: 'no-cache',
      context: getContext(store.state.accessToken),
    },
  );
  const _gameState = useResult(result, null, data => data.getGameState);
  watch(_gameState, value => {
    store.commit(SET_GAME_STATE, value);
  });
  return {
    getGameState,
  };
}
