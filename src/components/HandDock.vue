<template>
  <div class="flex-container">
    <div class="grid-container" :style="{ gridTemplateColumns }">
      <div
        v-for="(card, index) in sortedCards"
        :key="index"
        class="grid-column"
      >
        <card :model="card" @card-click="emitCardClick"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';

import Card from '@/components/Card.vue';
import { DEFAULT_CARD_SCALE, EVENT_CARD_CLICK } from '@/constants';
import { Card as CardModel, Suit, Rank, rankValue } from '@/domain';
import { useCardSize } from '@/playing-card-composable';

export default defineComponent({

  name: 'HandDock',

  components: {
    Card,
  },

  emits: [ EVENT_CARD_CLICK ],

  props: {
    cards: {
      type: Array,
      default: () => [
        new CardModel(Suit.Clubs, Rank.Nine),
        new CardModel(Suit.Diamonds, Rank.Ten),
        new CardModel(Suit.Spades, Rank.Queen),
        new CardModel(Suit.Hearts, Rank.Ace),
        new CardModel(Suit.Clubs, Rank.Ace),
        new CardModel(Suit.Diamonds, Rank.Six),
        new CardModel(Suit.Hearts, Rank.Seven),
      ],
    },
    trumpSuit: {
      type: String,
      default: Suit.Hearts,
    },
    cardScale: {
      type: Number,
      default: DEFAULT_CARD_SCALE,
    },
  },

  setup(props, { emit: _emit }) {
    const _cards = toRef(props, 'cards') as Ref<CardModel[]>;
    const _trumpSuit = toRef(props, 'trumpSuit') as Ref<Suit>;
    const _cardScale = toRef(props, 'cardScale') as Ref<number>;
    const { width: _cardWidth } = useCardSize(_cardScale);
    const maxGap = 5;
    return {
      sortedCards: computed(() => {
        const toSort = [ ..._cards.value ];
        toSort.sort((card1, card2) => {
          const suitComparation = (((card1.suit === _trumpSuit.value) && (card2.suit === _trumpSuit.value))
            ? 0
            : ((card1.suit === _trumpSuit.value)
              ? -1
              : ((card2.suit === _trumpSuit.value)
                ? 1
                : card1.suit.localeCompare(card2.suit))));
          return ((suitComparation !== 0)
            ? suitComparation
            : ((rankValue(card1.rank) > rankValue(card2.rank))
              ? -1
              : ((rankValue(card1.rank) < rankValue(card2.rank))
                ? 1
                : 0)));
        });
        return toSort;
      }),
      gridTemplateColumns: computed(() => ((_cards.value.length > 0)
        ? `repeat(${_cards.value.length - 1}, minmax(1px, ${_cardWidth.value + maxGap}px)) ${_cardWidth.value}px`
        : '1fr'
      )),
      emitCardClick(card: CardModel) {
        _emit(EVENT_CARD_CLICK, card);
      },
    };
  },

});
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: center;
  .grid-container {
    display: grid;
    .grid-column {
      justify-self: start;
      z-index: auto;
      transition: transform 0.1s;
      &:hover {
        transform: translate(0, -10px);
      }
    }
  }
}
</style>
