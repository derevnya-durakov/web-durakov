<template>
  <div class="relative-container" :style="relativeContainerStyle">
    <card class="deck" :scale="cardScale"/>
    <card
      v-if="trumpCard !== null"
      class="trump-card"
      :model="trumpCard"
      :scale="cardScale"
      :style="trumpCardStyle"
    />
    <div class="deck-size">{{deckSize}}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';

import Card from '@/components/Card.vue';
import { CARD_HEIGHT_RATIO, CARD_WIDTH_RATIO, DEFAULT_CARD_SCALE } from '@/constants';

export default defineComponent({

  name: 'CardDeck',

  components: {
    Card,
  },

  props: {
    deckSize: {
      type: Number,
      required: true,
    },
    trumpCard: {
      type: Object,
      default: null,
    },
    cardScale: {
      type: Number,
      default: DEFAULT_CARD_SCALE,
    },
  },

  setup(props) {
    const _cardScale = toRef(props, 'cardScale') as Ref<number>;
    const _cardWidth = computed(() => (_cardScale.value * CARD_WIDTH_RATIO));
    const _cardHeight = computed(() => (_cardScale.value * CARD_HEIGHT_RATIO));
    return {
      relativeContainerStyle: computed(() => ({ width: `${_cardHeight.value}px`, height: `${_cardHeight.value}px`})),
      trumpCardStyle: computed(() => ({ left: `${(_cardHeight.value - _cardWidth.value) / 2}px` })),
    };
  },

});
</script>

<style lang="scss" scoped>
.relative-container {
  position: relative;
  .trump-card {
    position: absolute;
    transform: rotate(-90deg);
    z-index: 0;
  }
  .deck {
    position: absolute;
    right: 0;
    z-index: 1;
  }
  .deck-size {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    border: 2px solid rgb(85, 58, 110);
    background-color: rgb(217, 183, 231);
    position: absolute;
    bottom: -12px;
    right: -12px;
    z-index: 1;
  }
}
</style>
