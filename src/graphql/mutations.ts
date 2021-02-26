import gql from 'graphql-tag';

import { GRAPHQL_FRAGMENT_GAME_STATE_ALL } from '@/graphql/fragments';

export const GRAPHQL_MUTATION_ADD_USER = gql`
  mutation addUser($nickname: String!) {
    addUser(nickname: $nickname) {
      id
      nickname
    }
  }
`;

export const GRAPHQL_MUTATION_ATTACK = gql`
  mutation attack($gameId: ID!, $attack: CardInput!) {
    attack(gameId: $gameId, card: $attack) {
      ...GameStateAll
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;

export const GRAPHQL_MUTATION_DEFEND = gql`
  mutation defend($gameId: ID!, $attack: CardInput!, $defence: CardInput!) {
    defend(gameId: $gameId, attackCard: $attack, defenceCard: $defence) {
      ...GameStateAll
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;

export const GRAPHQL_MUTATION_SAY_BEAT = gql`
  mutation sayBeat($gameId: ID!) {
    sayBeat(gameId: $gameId) {
      ...GameStateAll
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;

export const GRAPHQL_MUTATION_TAKE = gql`
  mutation take($gameId: ID!) {
    take(gameId: $gameId) {
      ...GameStateAll
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;

export const GRAPHQL_MUTATION_NEXT_GAME = gql`
  mutation nextGame($gameId: ID!) {
    nextGame(gameId: $gameId) {
      ...GameStateAll
    }
  }
  ${GRAPHQL_FRAGMENT_GAME_STATE_ALL}
`;
