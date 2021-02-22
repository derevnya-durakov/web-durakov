import { MutateFunction } from '@vue/apollo-composable';
import { ComputedRef } from 'vue';
import { Store } from 'vuex';

import Card from '@/model/Card';
import State from '@/store/State';

export function useGameActions(
  { state }: Store<State>,
  anyCardOnTable: ComputedRef<boolean>,
  iAmAttacker: ComputedRef<boolean>,
  iAmDefender: ComputedRef<boolean>,
  iCanAttackWith: (card: Card) => boolean,
  iCanDefendWith: (card: Card) => boolean,
  firstCardToDefend: ComputedRef<Card | null>,
  attack: MutateFunction<any, Record<string, any>>,
  defend: MutateFunction<any, Record<string, any>>,
  sayBeat: MutateFunction<any, Record<string, any>>,
  take: MutateFunction<any, Record<string, any>>,
) {
  return {

    doCardGameAction(card: Card) {
      if (iAmAttacker.value) {
        if (iCanAttackWith(card)) {
          attack({ gameId: state.gameId, attack: { suit: card.suit, rank: card.rank } });
        }
      } else if (iAmDefender.value) {
        if ((firstCardToDefend.value !== null) && iCanDefendWith(card)) {
          defend({
            gameId: state.gameId,
            attack: { suit: firstCardToDefend.value.suit, rank: firstCardToDefend.value.rank },
            defence: { suit: card.suit, rank: card.rank },
          });
        }
      } else {
        if (anyCardOnTable.value && iCanAttackWith(card)) {
          attack({ gameId: state.gameId, attack: { suit: card.suit, rank: card.rank } });
        }
      }
    },

    doSayBeat() {
      sayBeat({ gameId: state.gameId });
    },

    doTake() {
      take({ gameId: state.gameId });
    },

    doRelease() {
      sayBeat({ gameId: state.gameId });
    },

  };
}

