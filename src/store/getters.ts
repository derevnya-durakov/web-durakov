import { GetterTree } from 'vuex';

import { Card, Player, playersEqual, Rank } from '@/domain';
import State from '@/store/State';

const getters: GetterTree<State, State> = {

  loggedIn({ accessToken, loggedInUser }: State): boolean {
    return ((accessToken !== null) && (loggedInUser !== null));
  },

  myHand({ gameState }: State): Card[] {
    return ((gameState !== null) ? gameState.hand : []);
  },

  myPlayer: ({ loggedInUser, gameState }: State) => (((loggedInUser !== null) && (gameState !== null))
    ? (gameState.players.find(p => (p.user.id === loggedInUser.id)) || null)
    : null
  ),

  iAmAttacker: ({ gameState }, { myPlayer }) => (
    (gameState !== null)
    && (myPlayer !== null)
    && playersEqual(gameState.attacker, myPlayer)
  ),

  iAmDefender: ({ gameState }, { myPlayer }) => (
    (gameState !== null)
    && (myPlayer !== null)
    && playersEqual(gameState.defender, myPlayer)
  ),

  iCanSayBeat: (_, { allAttacksAreBeaten, anyCardOnTable, iAmDefender, myPlayer }) => (
    !iAmDefender
    && ((myPlayer !== null) && !myPlayer.saidBeat)
    && anyCardOnTable
    && allAttacksAreBeaten
  ),

  iCanRelease: ({ gameState }, { iAmDefender, myPlayer }) => (
    (gameState?.isTaking || false)
    && !iAmDefender
    && (myPlayer !== null)
    && (!myPlayer.saidBeat || false)
    && (myPlayer.handSize > 0)
  ),

  iCanTake: ({ gameState }, { allAttacksAreBeaten, iAmDefender }) => (
    !(gameState?.isTaking || false)
    && iAmDefender
    && !allAttacksAreBeaten
  ),

  gameIsEnd: ({ gameState }) => ((gameState !== null) && (gameState.durak !== null)),

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

  donePlayers({ gameState }: State): Player[] {
    if (gameState === null) {
      return [];
    }
    const { players } = gameState;
    const playersCopy = [ ...players ];
    playersCopy.sort((p1, p2) => {
      if ((p1.done !== null) && (p2.done !== null)) {
        return ((p1.done > p2.done)
          ? 1
          : ((p1.done < p2.done)
            ? -1
            : 0));
      } else if (p1.done === null) {
        return 1;
      } else if (p2.done === null) {
        return -1;
      } else {
        return 0;
      }
    });
    return playersCopy;
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
