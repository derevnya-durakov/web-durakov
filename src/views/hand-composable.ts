import { Ref, ref } from 'vue';

import Card from '@/models/Card';

export function useHand(
  cardFlippedToFront: Ref<boolean>,
  frontCardModel: Ref<Card | null>,
  backCardModel: Ref<Card | null>,
) {
  const hand = ref<Card[]>([]);
  return {
    hand,
    addCardToHand() {
      if (cardFlippedToFront.value) {
        if (frontCardModel.value !== null) {
          hand.value.push(frontCardModel.value);
        }
      } else {
        if (backCardModel.value !== null) {
          hand.value.push(backCardModel.value);
        }
      }
    },
  };
}
