import { Suit } from '@/domain';
import Card from '@/model/Card';
import Player from '@/model/Player';
import RoundPair from '@/model/RoundPair';

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
