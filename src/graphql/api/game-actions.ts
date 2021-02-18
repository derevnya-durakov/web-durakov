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
        }
      }
    `,
    { context: getContext(store.state.accessToken) },
  );
  return { attack };
}
