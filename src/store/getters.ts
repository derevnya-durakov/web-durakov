import { GetterTree } from 'vuex';

import Card from '@/model/Card';
import Player from '@/model/Player';
import State from '@/store/State';

const getters: GetterTree<State, State> = {

  loggedIn({ accessToken, loggedInUser }: State): boolean {
    return ((accessToken !== null) && (loggedInUser !== null));
  },

  myHand({ gameState }: State): Card[] {
    return ((gameState !== null) ? gameState.hand : []);
  },

  attacker({ gameState }: State): Player | null {
    if (gameState === null) {
      return null;
    }
    const { players, defendingId } = gameState;
    const defenderIndex = players.findIndex(p => (p.user.id === defendingId));
    if (defenderIndex === -1) {
      throw new Error('cannot find player');
    }
    const shift = defenderIndex - 1;  // attacker places before defender
    if (shift === -1) {
      return players[players.length - 1];
    }
    return players[shift];
  },

  defender: ({ gameState }: State) => ((gameState !== null)
    ? gameState.players.find(p => (p.user.id === gameState.defendingId))
    : null
  ),

  myPlayer: ({ loggedInUser, gameState }: State) => (((loggedInUser !== null) && (gameState !== null))
    ? (gameState.players.find(p => (p.user.id === loggedInUser.id)) || null)
    : null
  ),

  iAmAttacker: (_, { attacker, myPlayer }) => (((attacker !== null) && (myPlayer !== null)) && (attacker === myPlayer)),

  iAmDefender: (_, { defender, myPlayer }) => (((defender !== null) && (myPlayer !== null)) && (defender === myPlayer)),

  opponents({ loggedInUser, gameState }: State): Player[] {
    if ((loggedInUser === null) || (gameState === null)) {
      return [];
    }
    const { players } = gameState;
    const myIndex = players.findIndex(p => (p.user.id === loggedInUser.id));
    if (myIndex === -1) {
      throw new Error();
    }
    const playersCopy = [ ...players ];
    for (let i = 0; i < myIndex; i++) {
      playersCopy.push(playersCopy.shift() as Player);
    }
    return playersCopy.filter(p => (p.user.id !== loggedInUser.id));
  },

  firstCardToDefend: ({ gameState }: State, { iAmDefender }): Card | null => (((gameState !== null) && iAmDefender)
    ? (gameState.round.filter(rp => (rp.defence === null))[0]?.attack || null)
    : null
  ),

};

export default getters;
