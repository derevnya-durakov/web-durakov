import { computed, Ref } from 'vue';

import { CARD_WIDTH_RATIO, CARD_HEIGHT_RATIO } from '@/constants';

export function useCardSize(scaleRef: Ref<number>) {
  return {
    width: computed(() => (scaleRef.value * CARD_WIDTH_RATIO)),
    height: computed(() => (scaleRef.value * CARD_HEIGHT_RATIO)),
  };
}
