import gql from 'graphql-tag';

import { GRAPHQL_FRAGMENT_GAME_STATE_ALL } from '@/graphql/fragments';

export const GET_GAME_STATE = gql`
  query getGameState($gameId: ID!) {
    getGameState(id: $gameId) {
      ...GameStateAll
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;
