<template>
  <div>
    <div>
      <button
        v-for="suit in suits"
        :key="suit"
        :disabled="isSuitSelected(suit)"
        @click="setSuit(suit)"
      >
        {{suitSymbol(suit)}}
      </button>
    </div>
    <div>
      <button
        v-for="rank in ranks"
        :key="rank"
        :disabled="isRankSelected(rank)"
        @click="setRank(rank)"
      >
        {{rankTitle(rank)}}
      </button>
    </div>
    <flip style="margin: 0 auto;" :flipped="cardFlippedToFront">
      <template v-slot:front>
        <card :model="frontCardModel" :scale="cardScale" @click="flipBack"/>
      </template>
      <template v-slot:back>
        <card :model="backCardModel" :scale="cardScale" @click="flipBack"/>
      </template>
    </flip>
    <button
      :disabled="cardFlippedToFront ? (frontCardModel === null) : (backCardModel === null)"
      @click="addCardToHand"
    >
      add to hand
    </button>
    <hand-dock :cards="hand"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Card from '@/components/Card.vue';
import Flip from '@/components/Flip.vue';
import HandDock from '@/components/HandDock.vue';
import { suits, suitSymbol, ranks, rankTitle } from '@/domain';
import { useHand } from '@/views/hand-composable';
import { useFlip } from '@/views/flip-composable';

export default defineComponent({

  name: 'CardsDemo',

  components: {
    Card,
    Flip,
    HandDock,
  },

  setup() {
    const _flip = useFlip();
    return {
      cardScale: 50,
      ..._flip,
      ...useHand(_flip.cardFlippedToFront, _flip.frontCardModel, _flip.backCardModel),
      suits,
      suitSymbol,
      ranks,
      rankTitle,
    };
  },

});
</script>

<style lang="scss" scoped>
button {
  background-color: #99ddff;
  border: none;
  color: #4d4d4d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  &:disabled {
    background-color: #e6e6e6;
    color: #999999;
  }
}
</style>
