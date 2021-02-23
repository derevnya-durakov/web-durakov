export enum Suit {
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Hearts = 'Hearts',
  Spades = 'Spades',
}

export const suits = Object.values(Suit);

export function suitSymbol(suit: Suit): '♣' | '♦' | '♥' | '♠' {
  switch (suit) {
    case Suit.Clubs: return '♣';
    case Suit.Diamonds: return '♦';
    case Suit.Hearts: return '♥';
    case Suit.Spades: return '♠';
  }
}

//

// NOTE: lack of numeric values in favor of strings to support parsing GraphQL enums right way
export enum Rank {
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
  Ace = 'Ace',
}

export function rankValue(rank: Rank): number {
  switch (rank) {
    case Rank.Six: return 0;
    case Rank.Seven: return 1;
    case Rank.Eight: return 2;
    case Rank.Nine: return 3;
    case Rank.Ten: return 4;
    case Rank.Jack: return 5;
    case Rank.Queen: return 6;
    case Rank.King: return 7;
    case Rank.Ace: return 8;
  }
}

// NOTE: to guarantee ranks are sorted, we translate them to number first, and then sort them
// as numbers, after that we can translate them to enum back.
function _sortRankValues() {
  const rankValues = Object.values(Rank).map(r => rankValue(r));
  rankValues.sort((r1, r2) => ((r1 > r2) ? 1 : ((r1 < r2) ? -1 : 0)));
  return rankValues;
}

export const rankValues = _sortRankValues();

export function rankOf(value: number): Rank {
  switch (value) {
    case 0: return Rank.Six;
    case 1: return Rank.Seven;
    case 2: return Rank.Eight;
    case 3: return Rank.Nine;
    case 4: return Rank.Ten;
    case 5: return Rank.Jack;
    case 6: return Rank.Queen;
    case 7: return Rank.King;
    case 8: return Rank.Ace;
    default:
      throw new Error('such numeric value cannot be represented as Rank enum');
  }
}

export const ranks = rankValues.map(r => rankOf(r));

export function rankTitle(rank: Rank): '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' {
  switch (rank) {
    case Rank.Six: return '6';
    case Rank.Seven: return '7';
    case Rank.Eight: return '8';
    case Rank.Nine: return '9';
    case Rank.Ten: return '10';
    case Rank.Jack: return 'J';
    case Rank.Queen: return 'Q';
    case Rank.King: return 'K';
    case Rank.Ace: return 'A';
  }
}
