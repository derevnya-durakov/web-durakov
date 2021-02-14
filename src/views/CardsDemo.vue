<template>
  <div>
    <div>
      <button
        v-for="suit in suits"
        :key="suit"
        :disabled="isSuitSelected(suit)"
        :class="{ selected: isSuitSelected(suit) }"
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
        :class="{ selected: isRankSelected(rank) }"
        @click="setRank(rank)"
      >
        {{rankTitle(rank)}}
      </button>
    </div>
    <flip style="margin: 0 auto;" :flipped="cardFlippedToFront">
      <template v-slot:front>
        <card :model="frontCardModel" @click="flipBack"/>
      </template>
      <template v-slot:back>
        <card :model="backCardModel" @click="flipBack"/>
      </template>
    </flip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

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
    const _frontCardSuit = ref<Suit | null>(null);
    const _frontCardRank = ref<Rank | null>(null);
    const frontCardModel = computed((): CardModel | null => (
      ((_frontCardSuit.value !== null) && (_frontCardRank.value !== null))
        ? new CardModel(_frontCardSuit.value, _frontCardRank.value)
        : null
    ));
    const _backCardSuit = ref<Suit | null>(null);
    const _backCardRank = ref<Rank | null>(null);
    const backCardModel = computed((): CardModel | null => (
      ((_backCardSuit.value !== null) && (_backCardRank.value !== null))
        ? new CardModel(_backCardSuit.value, _backCardRank.value)
        : null
    ));
    const cardFlippedToFront = ref(frontCardModel.value !== null);
    const _selectedRank = computed(() => (cardFlippedToFront.value ? _frontCardRank.value : _backCardRank.value));
    const _selectedSuit = computed(() => (cardFlippedToFront.value ? _frontCardSuit.value : _backCardSuit.value));
    function _flip() {
      cardFlippedToFront.value = !cardFlippedToFront.value;
    }
    function _doFlipAndCancel(
      cardModelRef: Ref<CardModel | null>,
      cardSuitRef: Ref<Suit | null>,
      cardRankRef: Ref<Rank | null>,
    ) {
      if (cardModelRef.value !== null) {
        _flip();
      }
      cardSuitRef.value = null;
      cardRankRef.value = null;
    }
    function _setCardAttribute<CAT1, CAT2>(
      targetCardModelRef: Ref<CardModel | null>,
      targetCardAttribute1Ref: Ref<CAT1 | null>,
      targetCardAttribute2Ref: Ref<CAT2 | null>,
      flipCardAttribute1Ref: Ref<CAT1 | null>,
      flipCardAttribute2Ref: Ref<CAT2 | null>,
      attributeValue: CAT1,
    ) {
      targetCardAttribute1Ref.value = attributeValue;
      if (targetCardModelRef.value !== null) {
        flipCardAttribute1Ref.value = targetCardAttribute1Ref.value;
        flipCardAttribute2Ref.value = targetCardAttribute2Ref.value;
        targetCardAttribute1Ref.value = null;
        targetCardAttribute2Ref.value = null;
        _flip();
      }
    }
    return {
      frontCardModel,
      backCardModel,
      cardFlippedToFront,
      flipBack() {
        if (cardFlippedToFront.value) {
          _doFlipAndCancel(frontCardModel, _frontCardSuit, _frontCardRank);
        } else {
          _doFlipAndCancel(backCardModel, _backCardSuit, _backCardRank);
        }
      },
      isRankSelected: (rank: Rank) => ((_selectedRank.value !== null) && (_selectedRank.value === rank)),
      isSuitSelected: (suit: Suit) => ((_selectedSuit.value !== null) && (_selectedSuit.value === suit)),
      setRank(rank: Rank) {
        if (cardFlippedToFront.value) {
          _setCardAttribute<Rank, Suit>(frontCardModel, _frontCardRank, _frontCardSuit, _backCardRank, _backCardSuit, rank);
        } else {
          _setCardAttribute<Rank, Suit>(backCardModel, _backCardRank, _backCardSuit, _frontCardRank, _frontCardSuit, rank);
        }
      },
      setSuit(suit: Suit) {
        if (cardFlippedToFront.value) {
          _setCardAttribute<Suit, Rank>(frontCardModel, _frontCardSuit, _frontCardRank, _backCardSuit, _backCardRank, suit);
        } else {
          _setCardAttribute<Suit, Rank>(backCardModel, _backCardSuit, _backCardRank, _frontCardSuit, _frontCardRank, suit);
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
  &.selected {
    background-color: #e6e6e6;
    color: #999999;
  }
}
</style>
