<template>
  <div class="game-results">
    <h1>GAME OVER!</h1>
    <img src="/img/casino-case.jpg" width="300">
    <table>
      <tr v-for="player in donePlayers" :key="player.user.id">
        <td>{{playerIsDurak(player) ? 'Дурак' : player.done}}</td>
        <td>------------------</td>
        <td>{{player.user.nickname}}</td>
      </tr>
    </table>
    <button @click="playAgain">Сыграть ещё</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import { useNextGameMutation } from '@/composable/graphql';
import { useGameStateComputed } from '@/composable/state-computed';
import { Player, playersEqual } from '@/domain';
import State from '@/store/State';

export default defineComponent({

  name: 'GameResults',

  setup() {
    const _store = useStore<State>();
    const { donePlayers, durak } = useGameStateComputed(_store);
    const { nextGame: _nextGame } = useNextGameMutation(_store);
    return {
      donePlayers,
      durak,
      playerIsDurak: (player: Player) => ((durak.value !== null) && playersEqual(player, durak.value)),
      playAgain: () => _nextGame({ gameId: _store.state.gameId }),
    };
  },

});
</script>

<style lang="scss" scoped>
.game-results {
  background-color: rgb(228, 227, 182);
  padding: 10px;
  border-radius: 3px;
  font-weight: 900;
  table {
    width: 100%;
  }
}
</style>
