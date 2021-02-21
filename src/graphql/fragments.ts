import gql from 'graphql-tag';

export const GRAPHQL_FRAGMENT_CARD_ALL = gql`
  fragment CardAll on Card {
    suit
    rank
  }
`;

export const GRAPHQL_FRAGMENT_PLAYER_ALL = gql`
  fragment PlayerAll on Player {
    user {
      id
      nickname
    }
    handSize
    saidBeat
    done
  }
`;

export const GRAPHQL_FRAGMENT_ROUND_PAIR_ALL = gql`
  fragment RoundPairAll on RoundPair {
    attack {
      ...CardAll
    }
    defence {
      ...CardAll
    }
  }
  ${GRAPHQL_FRAGMENT_CARD_ALL}
`;

export const GRAPHQL_FRAGMENT_GAME_STATE_ALL = gql`
  fragment GameStateAll on GameState {
    id
    nonce
    trumpSuit
    lastTrump {
      ...CardAll
    }
    deckSize
    discardPileSize
    hand {
      ...CardAll
    }
    players {
      ...PlayerAll
    }
    round {
      ...RoundPairAll
    }
    attacker {
      ...PlayerAll
    }
    defender {
      ...PlayerAll
    }
    isTaking
  }
  ${GRAPHQL_FRAGMENT_CARD_ALL}
  ${GRAPHQL_FRAGMENT_PLAYER_ALL}
  ${GRAPHQL_FRAGMENT_ROUND_PAIR_ALL}
`;
