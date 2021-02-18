import { useMutation, useQuery, useResult, useSubscription } from '@vue/apollo-composable';
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
  const { refetch, result } = useQuery(
    gql`
      query getGameState($gameId: ID!) {
        getGameState(id: $gameId) {
          id
          nonce
          trumpSuit
          lastTrump {
            suit
            rank
          }
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
    getGameState: refetch as Function,
  };
}

export function useGameUpdatedSubscription(store: Store<State>, getGameState: Function) {
  const { result } = useSubscription(
    gql`
      subscription onGameUpdated($gameId: ID!) {
        gameUpdated(id: $gameId) {
          name
        }
      }
    `,
    { gameId: store.state.gameId },
    { context: getContext(store.state.accessToken) },
  );
  const _gameUpdated = useResult(result);
  watch(
    _gameUpdated,
    () => {
      getGameState();
    },
    { immediate: false },
  );
}

export { useAttackMutation } from '@/graphql/api/game-actions';
