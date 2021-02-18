<template>
  <div class="relative-container">
    <card :width="cardWidth" :height="cardHeight"/>
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
  width: 50px;
  height: 70px;
  position: relative;
  .deck-size {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    border: 2px solid rgb(85, 58, 110);
    background-color: rgb(217, 183, 231);
    position: absolute;
    bottom: -10px;
    right: -10px;
  }
}
</style>