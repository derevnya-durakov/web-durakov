<template>
  <div>
    <ul>
      <button @click="cardSuit = Suit.Clubs">Clubs</button>
      <button @click="cardSuit = Suit.Diamonds">Diamonds</button>
      <button @click="cardSuit = Suit.Hearts">Hearts</button>
      <button @click="cardSuit = Suit.Spades">Spades</button>
    </ul>
    <ul>
      <button @click="cardRank = Rank.Six">6</button>
      <button @click="cardRank = Rank.Seven">7</button>
      <button @click="cardRank = Rank.Eight">8</button>
      <button @click="cardRank = Rank.Nine">9</button>
      <button @click="cardRank = Rank.Ten">10</button>
      <button @click="cardRank = Rank.Jack">Jack</button>
      <button @click="cardRank = Rank.Queen">Queen</button>
      <button @click="cardRank = Rank.King">King</button>
      <button @click="cardRank = Rank.Ace">Ace</button>
    </ul>
    <card :suit="cardSuit" :rank="cardRank"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Suit, Rank } from '@/enums';

import Card from '@/components/Card.vue';

@Options({
  components: {
    Card,
  },
})
export default class Game extends Vue {

  readonly Suit = Suit;

  readonly Rank = Rank;

  cardSuit = Suit.Clubs;

  cardRank = Rank.Six;

}
</script>
