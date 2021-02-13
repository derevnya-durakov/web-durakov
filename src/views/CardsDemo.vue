<template>
  <div>
    <div>
      <button
        v-for="suit in suits"
        :key="suit"
        @click="setSuit(suit)"
      >
        {{suitSymbol(suit)}}
      </button>
    </div>
    <div>
      <button
        v-for="rank in ranks"
        :key="rank"
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
    function _flip() {
      cardFlippedToFront.value = !cardFlippedToFront.value;
    }
    function _setNull(cardSuitRef: Ref<Suit | null>, cardRankRef: Ref<Rank | null>) {
      cardSuitRef.value = null;
      cardRankRef.value = null;
    }
    function _flipAndSetNull(cardSuitRef: Ref<Suit | null>, cardRankRef: Ref<Rank | null>) {
      _flip();
      _setNull(cardSuitRef, cardRankRef);
    }
    return {
      frontCardModel,
      backCardModel,
      cardFlippedToFront,
      flipBack() {
        if (cardFlippedToFront.value) {
          if (frontCardModel.value !== null) {
            _flip();
          }
          _setNull(_backCardSuit, _backCardRank);
        } else {
          if (backCardModel.value !== null) {
            _flip();
          }
          _setNull(_frontCardSuit, _frontCardRank);
        }
      },
      setRank(rank: Rank) {
        if (cardFlippedToFront.value) {
          _backCardRank.value = rank;
          if (_frontCardSuit.value !== null) {
            _backCardSuit.value = _frontCardSuit.value;
          }
          if (_backCardSuit.value !== null) {
            _flipAndSetNull(_frontCardSuit, _frontCardRank);
          }
        } else {
          _frontCardRank.value = rank;
          if (_backCardSuit.value !== null) {
            _frontCardSuit.value = _backCardSuit.value;
          }
          if (_frontCardSuit.value !== null) {
            _flipAndSetNull(_backCardSuit, _backCardRank);
          }
        }
      },
      setSuit(suit: Suit) {
        if (cardFlippedToFront.value) {
          _backCardSuit.value = suit;
          if (_frontCardRank.value !== null) {
            _backCardRank.value = _frontCardRank.value;
          }
          if (_backCardRank.value !== null) {
            _flipAndSetNull(_frontCardSuit, _frontCardRank);
          }
        } else {
          _frontCardSuit.value = suit;
          if (_backCardRank.value !== null) {
            _frontCardRank.value = _backCardRank.value;
          }
          if (_frontCardRank.value !== null) {
            _flipAndSetNull(_backCardSuit, _backCardRank);
          }
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
