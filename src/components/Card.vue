<template>
  <div>
    <img
      :width="width"
      :height="height"
      :src="`/img/cards/${face}`"
      :alt="face"
    >
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Suit, Rank } from '@/enums';
import CardModel from '@/models/Card';

@Options({
  props: {
    model: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 350,
    },
  },
})
export default class Card extends Vue {

  readonly Suit = Suit;

  readonly Rank = Rank;

  model!: CardModel | null;

  width!: number;

  height!: number;

  get face(): string {
    return (this.model) ? `${this.model.suit}${this.Rank[this.model.rank]}.svg` : 'CardBack.svg';
  }

}
</script>
