<template>
  <div class="relative-container" :style="{ width: `${cardHeight}px`, height: `${cardHeight}px` }">
    <card
      class="deck"
      :width="cardWidth"
      :height="cardHeight"
      :style="{ left: `${cardHeight - cardWidth}px` }"
    />
    <card
      v-if="trumpCard !== null"
      :model="trumpCard"
      :width="cardWidth"
      :height="cardHeight"
      class="rotated"
      :style="{ left: `${(cardHeight - cardWidth) / 2}px` }"
    />
    <div class="deck-size">{{deckSize}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Card from '@/components/Card.vue';

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
    cardWidth: {
      type: Number,
      required: true,
    },
    cardHeight: {
      type: Number,
      required: true,
    },
  },

});
</script>

<style lang="scss" scoped>
.relative-container {
  // background-color: red;
  position: relative;
  .rotated {
    position: absolute;
    transform: rotate(-90deg);
    z-index: 0;
  }
  .deck {
    position: absolute;
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
