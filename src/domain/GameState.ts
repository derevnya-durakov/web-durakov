import { Card, Player, RoundPair, Suit } from '@/domain';

export default interface GameState {

  id: string;

  nonce: number;

  trumpSuit: Suit;

  lastTrump: Card | null;

  deckSize: number;

  discardPileSize: number;

  hand: Card[];

  players: Player[];

  round: RoundPair[];

  attacker: Player;

  defender: Player;

  durak: Player | null;

  isTaking: boolean;

}
