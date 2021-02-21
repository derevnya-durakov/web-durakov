import { useMutation } from '@vue/apollo-composable';
import { DocumentNode } from 'graphql';
import { Store } from 'vuex';

import { getContext } from '@/graphql/api';

import {
  GRAPHQL_MUTATION_ATTACK,
  GRAPHQL_MUTATION_DEFEND,
  GRAPHQL_MUTATION_SAY_BEAT,
  GRAPHQL_MUTATION_TAKE,
} from '@/graphql/mutations';

import GameState from '@/model/GameState';
import { SET_GAME_STATE } from '@/store/mutation-types';
import State from '@/store/State';

function _makeGameActionMutation(
  { commit, state }: Store<State>,
  graphqlMutation: DocumentNode,
  gameStateProvider: (data: any) => GameState,
) {
  const context = getContext(state.accessToken);
  const { mutate, onDone } = useMutation(graphqlMutation, { context });
  onDone(({ data }) => commit(SET_GAME_STATE, gameStateProvider(data)));
  return mutate;
}

export function useAttackMutation(store: Store<State>) {
  return { attack: _makeGameActionMutation(store, GRAPHQL_MUTATION_ATTACK, data => data.attack as GameState) };
}

export function useDefendMutation(store: Store<State>) {
  return { defend: _makeGameActionMutation(store, GRAPHQL_MUTATION_DEFEND, data => data.defend as GameState) };
}

export function useSayBeatMutation(store: Store<State>) {
  return { sayBeat: _makeGameActionMutation(store, GRAPHQL_MUTATION_SAY_BEAT, data => data.sayBeat as GameState) };
}

export function useTakeMutation(store: Store<State>) {
  return { take: _makeGameActionMutation(store, GRAPHQL_MUTATION_TAKE, data => data.take as GameState) };
}
