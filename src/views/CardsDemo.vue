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
    <flip style="margin: 0 auto;" :flipped="cardFlipped">
      <template v-slot:front>
        <card :model="cardModel" @click="flipBack"/>
      </template>
      <template v-slot:back>
        <card/>
      </template>
    </flip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { Suit, suits, suitSymbol, Rank, ranks, rankTitle } from '@/enums';
import CardModel from '@/models/Card';

import Card from '@/components/Card.vue';
import Flip from '@/components/Flip.vue';

export default defineComponent({

  name: 'CardsDemo',

  components: {
    Card,
    Flip,
  },

  setup() {
    const cardSuit = ref<Suit | null>(null);
    const cardRank = ref<Rank | null>(null);
    const cardModel = computed((): CardModel | null => (
      ((cardSuit.value !== null) && (cardRank.value !== null))
        ? new CardModel(cardSuit.value, cardRank.value)
        : null
    ));
    return {
      cardSuit,
      cardRank,
      cardModel,
      cardFlipped: computed(() => {
        return (cardModel.value !== null);
      }),
      flipBack() {
        if (cardModel.value !== null) {
          cardSuit.value = null;
          cardRank.value = null;
        }
      },
      suits,
      suitSymbol,
      ranks,
      rankTitle,
    };
  },

});
</script>
