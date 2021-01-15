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
import { Options, Vue } from 'vue-class-component';

import { Suit, suits, suitSymbol, Rank, ranks, rankTitle } from '@/enums';
import CardModel from '@/models/Card';

import Card from '@/components/Card.vue';

@Options({
  components: {
    Card,
  },
})
export default class Game extends Vue {

  readonly Suit = Suit;

  readonly suits = suits;

  readonly suitSymbol = suitSymbol;

  readonly Rank = Rank;

  readonly ranks = ranks;

  readonly rankTitle = rankTitle;

  cardSuit: Suit | null = null;

  cardRank: Rank | null = null;

  get cardModel(): CardModel | null {
    if ((this.cardSuit === null) || (this.cardRank === null)) {
      return null;
    }
    return new CardModel(this.cardSuit, this.cardRank);
  }

}
</script>
