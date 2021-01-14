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
    <card :suit="cardSuit" :rank="cardRank"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Suit, suits, suitSymbol, Rank, ranks, rankTitle } from '@/enums';

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

  cardSuit = Suit.Clubs;

  cardRank = Rank.Six;

}
</script>
