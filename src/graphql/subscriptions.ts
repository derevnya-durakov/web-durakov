import gql from 'graphql-tag';

import { GRAPHQL_FRAGMENT_GAME_STATE_ALL } from '@/graphql/fragments';

export const GRAPHQL_SUBSCRIPTION_GAME_UPDATED = gql`
  subscription gameUpdated($gameId: ID!) {
    gameUpdated(id: $gameId) {
      name
      state {
        ...GameStateAll
      }
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;
