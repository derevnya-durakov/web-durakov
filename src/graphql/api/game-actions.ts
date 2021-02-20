import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { Store } from 'vuex';

import { getContext } from '@/graphql/api';
import State from '@/store/State';

export function useAttackMutation(store: Store<State>) {
  const { mutate: attack } = useMutation(
    gql`
      mutation attack($gameId: ID!, $attack: CardInput!) {
        attack(gameId: $gameId, card: $attack) {
          nonce
        }
      }
    `,
    { context: getContext(store.state.accessToken) },
  );
  return { attack };
}

export function useDefendMutation(store: Store<State>) {
  const { mutate: defend } = useMutation(
    gql`
      mutation defend($gameId: ID!, $attack: CardInput!, $defence: CardInput!) {
        defend(gameId: $gameId, attackCard: $attack, defenceCard: $defence) {
          nonce
        }
      }
    `,
    { context: getContext(store.state.accessToken) },
  );
  return { defend };
}

export function useSayBeatMutation(store: Store<State>) {
  const { mutate: sayBeat } = useMutation(
    gql`
      mutation sayBeat($gameId: ID!) {
        sayBeat(gameId: $gameId) {
          nonce
        }
      }
    `,
    { context: getContext(store.state.accessToken) },
  );
  return { sayBeat };
}
