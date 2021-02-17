import { Suit } from '@/enums';
import Card from '@/model/Card';
import Player from '@/model/Player';
import RoundPair from '@/model/RoundPair';

export default interface GameState {

  id: string;

  nonce: number;

  trumpSuit: Suit;

  deckSize: number;

  discardPileSize: number;

  hand: Card[];

  players: Player[];

  round: RoundPair[];

  defendingId: string;

}
