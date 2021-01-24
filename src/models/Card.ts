import { Suit, Rank } from '@/enums';

export default class Card {

  constructor(readonly suit: Suit, readonly rank: Rank) {}

}
