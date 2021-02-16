import { ComputedRef, computed, Ref, ref } from 'vue';

import { Rank, Suit } from '@/enums';
import Card from '@/models/Card';

interface ComposedCard {
  suit: Ref<Suit | null>;
  rank: Ref<Rank | null>;
  model: ComputedRef<Card | null>;
}

function composeCard(): ComposedCard {
  const suit = ref<Suit | null>(null);
  const rank = ref<Rank | null>(null);
  return {
    suit,
    rank,
    model: computed((): Card | null => (
      ((suit.value !== null) && (rank.value !== null))
        ? new Card(suit.value, rank.value)
        : null
    ))
  }
}

export function useFlip() {
  const _frontCard = composeCard();
  const _backCard = composeCard();

  const cardFlippedToFront = ref(_frontCard.model.value !== null);

  const _selectedRank = computed(() => (cardFlippedToFront.value ? _frontCard.rank.value : _backCard.rank.value));
  const _selectedSuit = computed(() => (cardFlippedToFront.value ? _frontCard.suit.value : _backCard.suit.value));

  function _flip() {
    cardFlippedToFront.value = !cardFlippedToFront.value;
  }

  function _doFlipAndCancel(card: ComposedCard) {
    if (card.model.value !== null) {
      _flip();
    }
    card.suit.value = null;
    card.rank.value = null;
  }

  function _setCardAttribute(
    targetCard: ComposedCard,
    attributeName: Exclude<keyof ComposedCard, 'model'>,
    attributeValue: Suit | Rank,
    flipCard: ComposedCard,
  ) {
    targetCard[attributeName].value = attributeValue;
    if (targetCard.model.value !== null) {
      flipCard.suit.value = targetCard.suit.value;
      flipCard.rank.value = targetCard.rank.value;
      targetCard.suit.value = null;
      targetCard.rank.value = null;
      _flip();
    }
  }

  return {
    frontCardModel: _frontCard.model,
    backCardModel: _backCard.model,
    cardFlippedToFront,
    flipBack() {
      if (cardFlippedToFront.value) {
        _doFlipAndCancel(_frontCard);
      } else {
        _doFlipAndCancel(_backCard);
      }
    },
    isRankSelected: (rank: Rank) => ((_selectedRank.value !== null) && (_selectedRank.value === rank)),
    isSuitSelected: (suit: Suit) => ((_selectedSuit.value !== null) && (_selectedSuit.value === suit)),
    setRank(rank: Rank) {
      if (cardFlippedToFront.value) {
        _setCardAttribute(_frontCard, 'rank', rank, _backCard);
      } else {
        _setCardAttribute(_backCard, 'rank', rank, _frontCard);
      }
    },
    setSuit(suit: Suit) {
      if (cardFlippedToFront.value) {
        _setCardAttribute(_frontCard, 'suit', suit, _backCard);
      } else {
        _setCardAttribute(_backCard, 'suit', suit, _frontCard);
      }
    },
  };
}
