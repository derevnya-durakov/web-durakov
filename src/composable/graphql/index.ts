import { useMutation, useQuery, useResult, useSubscription } from '@vue/apollo-composable';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { watch } from 'vue';
import { Store } from 'vuex';

import { GRAPHQL_MUTATION_ADD_USER } from '@/graphql/mutations';
import { GET_GAME_STATE } from '@/graphql/queries';
import { GRAPHQL_SUBSCRIPTION_GAME_UPDATED } from '@/graphql/subscriptions';
import { SET_GAME_STATE } from '@/store/mutation-types';
import State from '@/store/State';

export function getContext(headerXAuthToken: string | null): ConnectionParams {
  return {
    headers: { 'X-Auth-Token': headerXAuthToken || '' },
  };
}

export function useAddUserMutation({ state }: Store<State>) {
  const context = getContext(state.accessToken);
  const { mutate: addUser } = useMutation(GRAPHQL_MUTATION_ADD_USER, { context });
  return { addUser };
}

export function useGetGameStateQuery({ commit, state }: Store<State>) {
  const { refetch, result } = useQuery(
    GET_GAME_STATE,
    { gameId: state.gameId },
    {
      fetchPolicy: 'no-cache',
      context: getContext(state.accessToken),
    },
  );
  const _gameState = useResult(result, null, data => data.getGameState);
  watch(_gameState, value => commit(SET_GAME_STATE, value));
  return {
    getGameState: refetch as Function,  // NOTE: we cast 'refetch' to Function (although the origianal type
                                        // is Promise<...> which is not callable) to omit ts errors when using
                                        // 'getGameState' ahh... stuff. anyway, 'console.log(getGameState)' prints
                                        // a function
  };
}

export function useGameUpdatedSubscription({ commit, state }: Store<State>) {
  const { result } = useSubscription(
    GRAPHQL_SUBSCRIPTION_GAME_UPDATED,
    { gameId: state.gameId },
    { context: getContext(state.accessToken) },
  );
  watch(
    useResult(result),
    ({ name, state: newGameState }) => {
      if ((name === 'GAME_CREATED') || ((state.gameState !== null) && (newGameState.nonce > state.gameState.nonce))) {
        commit(SET_GAME_STATE, newGameState);
      }
    },
    { immediate: false },
  );
}

export { useAttackMutation, useDefendMutation, useSayBeatMutation, useTakeMutation } from '@/composable/graphql/game-actions';
