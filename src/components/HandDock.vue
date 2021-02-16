<template>
  <div class="flex-container">
    <div class="grid-container" :style="{ gridTemplateColumns }">
      <div v-for="(card, index) in sortedCards" :key="index" class="grid-column">
        <card
          :model="card"
          :width="5 * scale"
          :height="7 * scale"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';

import Card from '@/components/Card.vue';
import { Suit, Rank } from '@/enums';
import CardModel from '@/models/Card';

export default defineComponent({

  name: 'HandDock',

  components: {
    Card,
  },

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
  },

  setup(props) {
    const _cards = toRef(props, 'cards') as Ref<CardModel[]>;
    const _trumpSuit = toRef(props, 'trumpSuit') as Ref<Suit>;
    return {
      scale: 25,
      maxGap: 5,
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
            : ((card1.rank > card2.rank)
              ? -1
              : ((card1.rank < card2.rank) ? 1 : 0)));
        });
        return toSort;
      }),
    };
  },

  computed: {
    gridTemplateColumns(): string {
      return ((this.cards.length > 0)
        ? `repeat(${this.cards.length - 1}, minmax(1px, ${5 * this.scale + this.maxGap}px)) ${5 * this.scale}px`
        : '1fr'
      );
    }
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
    }
  }
}
</style>
