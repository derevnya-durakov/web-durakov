<template>
  <div>
    <div>
      <button
        v-for="suit in Object.values(Suit)"
        :key="suit"
        @click="cardSuit = suit"
      >
        {{suitSymbol(suit)}}
      </button>
    </div>
    <div>
      <button
        v-for="rank in Object.values(Rank).filter(r => ((typeof r) === 'number'))"
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

import { Suit, Rank, suitSymbol, rankTitle } from '@/enums';

import Card from '@/components/Card.vue';

@Options({
  components: {
    Card,
  },
})
export default class Game extends Vue {

  readonly Suit = Suit;

  readonly suitSymbol = suitSymbol;

  readonly Rank = Rank;

  readonly rankTitle = rankTitle;

  cardSuit = Suit.Clubs;

  cardRank = Rank.Six;

}
</script>
