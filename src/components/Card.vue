<template>
  <template v-if="suit === Suit.Clubs">
    <clubs-six-svg v-if="rank === Rank.Six"/>
    <clubs-seven-svg v-else-if="rank === Rank.Seven"/>
    <clubs-eight-svg v-else-if="rank === Rank.Eight"/>
    <clubs-nine-svg v-else-if="rank === Rank.Nine"/>
    <clubs-ten-svg v-else-if="rank === Rank.Ten"/>
    <clubs-jack-svg v-else-if="rank === Rank.Jack"/>
    <clubs-queen-svg v-else-if="rank === Rank.Queen"/>
    <clubs-king-svg v-else-if="rank === Rank.King"/>
    <clubs-ace-svg v-else-if="rank === Rank.Ace"/>
  </template>
  <template v-else-if="suit === Suit.Diamonds">
    <diamonds-six-svg v-if="rank === Rank.Six"/>
    <diamonds-seven-svg v-else-if="rank === Rank.Seven"/>
    <diamonds-eight-svg v-else-if="rank === Rank.Eight"/>
    <diamonds-nine-svg v-else-if="rank === Rank.Nine"/>
    <diamonds-ten-svg v-else-if="rank === Rank.Ten"/>
    <diamonds-jack-svg v-else-if="rank === Rank.Jack"/>
    <diamonds-queen-svg v-else-if="rank === Rank.Queen"/>
    <diamonds-king-svg v-else-if="rank === Rank.King"/>
    <diamonds-ace-svg v-else-if="rank === Rank.Ace"/>
  </template>
  <template v-else-if="suit === Suit.Hearts">
    <hearts-six-svg v-if="rank === Rank.Six"/>
    <hearts-seven-svg v-else-if="rank === Rank.Seven"/>
    <hearts-eight-svg v-else-if="rank === Rank.Eight"/>
    <hearts-nine-svg v-else-if="rank === Rank.Nine"/>
    <hearts-ten-svg v-else-if="rank === Rank.Ten"/>
    <hearts-jack-svg v-else-if="rank === Rank.Jack"/>
    <hearts-queen-svg v-else-if="rank === Rank.Queen"/>
    <hearts-king-svg v-else-if="rank === Rank.King"/>
    <hearts-ace-svg v-else-if="rank === Rank.Ace"/>
  </template>
  <template v-else-if="suit === Suit.Spades">
    <spades-six-svg v-if="rank === Rank.Six"/>
    <spades-seven-svg v-else-if="rank === Rank.Seven"/>
    <spades-eight-svg v-else-if="rank === Rank.Eight"/>
    <spades-nine-svg v-else-if="rank === Rank.Nine"/>
    <spades-ten-svg v-else-if="rank === Rank.Ten"/>
    <spades-jack-svg v-else-if="rank === Rank.Jack"/>
    <spades-queen-svg v-else-if="rank === Rank.Queen"/>
    <spades-king-svg v-else-if="rank === Rank.King"/>
    <spades-ace-svg v-else-if="rank === Rank.Ace"/>
  </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { Suit, Rank } from '@/enums';

import ClubsSixSvg from '@/components/svg/ClubsSixSvg.vue';
import ClubsSevenSvg from '@/components/svg/ClubsSevenSvg.vue';
import ClubsEightSvg from '@/components/svg/ClubsEightSvg.vue';
import ClubsNineSvg from '@/components/svg/ClubsNineSvg.vue';
import ClubsTenSvg from '@/components/svg/ClubsTenSvg.vue';
import ClubsJackSvg from '@/components/svg/ClubsJackSvg.vue';
import ClubsQueenSvg from '@/components/svg/ClubsQueenSvg.vue';
import ClubsKingSvg from '@/components/svg/ClubsKingSvg.vue';
import ClubsAceSvg from '@/components/svg/ClubsAceSvg.vue';

import DiamondsSixSvg from '@/components/svg/DiamondsSixSvg.vue';
import DiamondsSevenSvg from '@/components/svg/DiamondsSevenSvg.vue';
import DiamondsEightSvg from '@/components/svg/DiamondsEightSvg.vue';
import DiamondsNineSvg from '@/components/svg/DiamondsNineSvg.vue';
import DiamondsTenSvg from '@/components/svg/DiamondsTenSvg.vue';
import DiamondsJackSvg from '@/components/svg/DiamondsJackSvg.vue';
import DiamondsQueenSvg from '@/components/svg/DiamondsQueenSvg.vue';
import DiamondsKingSvg from '@/components/svg/DiamondsKingSvg.vue';
import DiamondsAceSvg from '@/components/svg/DiamondsAceSvg.vue';

import HeartsSixSvg from '@/components/svg/HeartsSixSvg.vue';
import HeartsSevenSvg from '@/components/svg/HeartsSevenSvg.vue';
import HeartsEightSvg from '@/components/svg/HeartsEightSvg.vue';
import HeartsNineSvg from '@/components/svg/HeartsNineSvg.vue';
import HeartsTenSvg from '@/components/svg/HeartsTenSvg.vue';
import HeartsJackSvg from '@/components/svg/HeartsJackSvg.vue';
import HeartsQueenSvg from '@/components/svg/HeartsQueenSvg.vue';
import HeartsKingSvg from '@/components/svg/HeartsKingSvg.vue';
import HeartsAceSvg from '@/components/svg/HeartsAceSvg.vue';

import SpadesSixSvg from '@/components/svg/SpadesSixSvg.vue';
import SpadesSevenSvg from '@/components/svg/SpadesSevenSvg.vue';
import SpadesEightSvg from '@/components/svg/SpadesEightSvg.vue';
import SpadesNineSvg from '@/components/svg/SpadesNineSvg.vue';
import SpadesTenSvg from '@/components/svg/SpadesTenSvg.vue';
import SpadesJackSvg from '@/components/svg/SpadesJackSvg.vue';
import SpadesQueenSvg from '@/components/svg/SpadesQueenSvg.vue';
import SpadesKingSvg from '@/components/svg/SpadesKingSvg.vue';
import SpadesAceSvg from '@/components/svg/SpadesAceSvg.vue';

const suits = Object.values(Suit);

const ranks = Object.values(Rank);

@Options({
  components: {
    ClubsSixSvg,
    ClubsSevenSvg,
    ClubsEightSvg,
    ClubsNineSvg,
    ClubsTenSvg,
    ClubsJackSvg,
    ClubsQueenSvg,
    ClubsKingSvg,
    ClubsAceSvg,

    DiamondsSixSvg,
    DiamondsSevenSvg,
    DiamondsEightSvg,
    DiamondsNineSvg,
    DiamondsTenSvg,
    DiamondsJackSvg,
    DiamondsQueenSvg,
    DiamondsKingSvg,
    DiamondsAceSvg,

    HeartsSixSvg,
    HeartsSevenSvg,
    HeartsEightSvg,
    HeartsNineSvg,
    HeartsTenSvg,
    HeartsJackSvg,
    HeartsQueenSvg,
    HeartsKingSvg,
    HeartsAceSvg,

    SpadesSixSvg,
    SpadesSevenSvg,
    SpadesEightSvg,
    SpadesNineSvg,
    SpadesTenSvg,
    SpadesJackSvg,
    SpadesQueenSvg,
    SpadesKingSvg,
    SpadesAceSvg,
  },
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
      type: String,
      default: '2.5in',
    },
    height: {
      type: String,
      default: '3.5in',
    },
  },
})
export default class Card extends Vue {

  readonly Suit = Suit;

  readonly Rank = Rank;

  suit!: string;

  rank!: string;

  width!: string;

  height!: string;

}
</script>
