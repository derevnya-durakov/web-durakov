<template>
  <img
    :width="width"
    :height="height"
    :src="`/img/cards/${face}`"
    :alt="face"
  >
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Suit, Rank } from '@/enums';

const suits = Object.values(Suit);

const ranks = Object.values(Rank);

@Options({
  props: {
    suit: {
      type: String,
      required: true,
      validator: (suit: Suit) => (suits.indexOf(suit) !== -1),
    },
    rank: {
      type: Number,
      required: true,
      validator: (rank: number) => (ranks.indexOf(rank) !== -1),
    },
    width: {
      type: Number,
      default: '250',
    },
    height: {
      type: Number,
      default: '350',
    },
  },
})
export default class Card extends Vue {

  readonly Suit = Suit;

  readonly Rank = Rank;

  suit!: string;

  rank!: number;

  width!: number;

  height!: number;

  get face(): string {
    return `${this.suit}${this.Rank[this.rank]}.svg`;
  }

}
</script>
