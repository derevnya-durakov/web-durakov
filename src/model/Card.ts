import { Suit, Rank, rankValue } from '@/enums';

export default class Card {

  constructor(readonly suit: Suit, readonly rank: Rank) {}

}

// NOTE: We cannot define 'beats' as a 'Card' method because after getting JSON
// from server it parses like a 'Card' instance, but actually it contains only
// the fields, not methods. In this case, the constructor is not called!
// To prevent errors like '`beats` is not a function', we use this standalone one.
export function beats(defence: Card, attack: Card, trumpSuit: Suit): boolean {
  // trump rules
  if (defence.suit === trumpSuit) {
    if (attack.suit !== trumpSuit) {
      return true;
    }
  } else if (attack.suit === trumpSuit) {
    return false;
  }
  // common rules
  if (defence.suit !== attack.suit) {
    return false;
  }
  return rankValue(defence.rank) > rankValue(attack.rank);
}
