<template>
  <div>
    <div>
      <button
        v-for="suit in suits"
        :key="suit"
        @click="cardSuit = suit"
      >
        {{suitSymbol(suit)}}
      </button>
    </div>
    <div>
      <button
        v-for="rank in ranks"
        :key="rank"
        @click="cardRank = rank"
      >
        {{rankTitle(rank)}}
      </button>
    </div>
    <card :model="cardModel"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { Suit, suits, suitSymbol, Rank, ranks, rankTitle } from '@/enums';
import CardModel from '@/models/Card';

import Card from '@/components/Card.vue';

const CardsDemo = defineComponent({

  components: {
    Card,
  },

  setup() {
    const cardSuit = ref<Suit | null>(null);
    const cardRank = ref<Rank | null>(null);
    return {
      cardSuit,
      cardRank,
      cardModel: computed((): CardModel | null => {
        if ((cardSuit.value === null) || (cardRank.value === null)) {
          return null;
        }
        return new CardModel(cardSuit.value, cardRank.value);
      }),
      suits,
      suitSymbol,
      ranks,
      rankTitle,
    };
  },

});

export default CardsDemo;
</script>
