import { ComputedRef, computed } from 'vue';
import { Store } from 'vuex';

import { beats, Card, Player, playersEqual, Rank } from '@/domain';
import State from '@/store/State';

export function useValidation(
  { getters, state }: Store<State>,
  firstCardToDefend: ComputedRef<Card | null>,
  defender: ComputedRef<Player | null>,
) {
  const _availableRanksForAttack = computed(() => getters.availableRanksForAttack as Rank[]);
  const _isTaking = computed(() => (state.gameState?.isTaking || false));
  return {

    // computed

    allAttacksAreBeaten: computed(() => getters.allAttacksAreBeaten as boolean),

    anyCardOnTable: computed(() => getters.anyCardOnTable as boolean),

    iAmAttacker: computed(() => getters.iAmAttacker as boolean),

    iAmDefender: computed(() => getters.iAmDefender as boolean),

    iCanSayBeat: computed(() => getters.iCanSayBeat as ComputedRef<boolean>),

    iCanRelease: computed(() => getters.iCanRelease as ComputedRef<boolean>),

    iCanTake: computed(() => getters.iCanTake as ComputedRef<boolean>),


    // methods

    iCanAttackWith: (card: Card): boolean => (
      (_availableRanksForAttack.value.length === 0)
      || _availableRanksForAttack.value.includes(card.rank)
    ),

    iCanDefendWith: (card: Card): boolean => (
      (state.gameState !== null)
      && (firstCardToDefend.value !== null)
      && beats(card, firstCardToDefend.value, state.gameState.trumpSuit)
    ),

    isPlayerTaking: (player: Player): boolean => (
      _isTaking.value
      && (defender.value !== null)
      && playersEqual(player, defender.value)
    ),

  };
}
