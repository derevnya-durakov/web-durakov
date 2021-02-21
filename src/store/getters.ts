import { GetterTree } from 'vuex';

import { Rank } from '@/enums';
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

  attacker: ({ gameState }: State) => (((gameState !== null) && gameState.attacker) || null),

  defender: ({ gameState }: State) => (((gameState !== null) && gameState.defender) || null),

  myPlayer: ({ loggedInUser, gameState }: State) => (((loggedInUser !== null) && (gameState !== null))
    ? (gameState.players.find(p => (p.user.id === loggedInUser.id)) || null)
    : null
  ),

  iAmAttacker: (_, { attacker, myPlayer }) => (
    (attacker !== null)
    && (myPlayer !== null)
    && (attacker.user.id === myPlayer.user.id)
  ),

  iAmDefender: (_, { defender, myPlayer }) => (
    (defender !== null)
    && (myPlayer !== null)
    && (defender.user.id === myPlayer.user.id)
  ),

  opponents({ loggedInUser, gameState }: State): Player[] {
    if ((loggedInUser === null) || (gameState === null)) {
      return [];
    }
    console.log(gameState);
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

  availableRanksForAttack({ gameState }: State, { iAmAttacker }): Rank[] {
    if ((gameState === null) || !iAmAttacker) {
      return [];
    }
    const rankArrays = gameState.round
        .map(({ attack, defence }) => ((defence !== null) ? [ attack.rank, defence.rank ] : [ attack.rank ]));
    switch (rankArrays.length) {
      case 0: return [];
      case 1: return [ ...new Set(rankArrays[0]) ];
      default: return [ ...new Set(rankArrays.reduce((acc, cur) => acc.concat(...cur))) ];
    }
  },

  anyCardOnTable: ({ gameState }: State) => ((gameState !== null) && (gameState.round.length > 0)),

  allAttacksAreBeaten: ({ gameState }: State) => (
    (gameState !== null)
    && (gameState.round.filter(rp => (rp.defence === null)).length === 0)
  ),

};

export default getters;
