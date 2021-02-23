import { computed } from 'vue';
import { Store } from 'vuex';

import { Card, Player, User } from '@/domain';
import State from '@/store/State';

export function useAuthComputed({ getters, state }: Store<State>) {
  return {
    loggedIn: computed(() => getters.loggedIn as boolean),
    loggedInUser: computed(() => state.loggedInUser as User | null),
  };
}

export function useGameStateComputed({ getters, state }: Store<State>) {
  return {
    attacker: computed(() => (state.gameState?.attacker || null)),
    deckSize: computed(() => (state.gameState?.deckSize || 0)),
    defender: computed(() => (state.gameState?.defender || null)),
    firstCardToDefend: computed(() => getters.firstCardToDefend as Card | null),
    lastTrump: computed(() => (state.gameState?.lastTrump || null)),
    myHand: computed(() => getters.myHand as Card[]),
    myPlayer: computed(() => getters.myPlayer as Player | null),
    opponents: computed(() => getters.opponents as Player[]),
    round: computed(() => (state.gameState?.round || [])),
    trumpSuit: computed(() => (state.gameState?.trumpSuit || null)),
  };
}
