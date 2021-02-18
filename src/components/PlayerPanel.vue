<template>
  <div class="player-panel">
    <div class="grid-container">
      <div>
        <div class="avatar">
          <img class="icon" width="100" src="/img/avatar.png">
          <template v-if="actionIcon !== null">
            <img class="action" :src="`/img/actions/${actionIcon}.png`">
          </template>
        </div>
        <div class="nickname">{{model.user.nickname}}</div>
      </div>
      <div class="centered-horizontally">
        <div class="centered-vertically">
          <card-deck :deck-size="model.handSize" card-width="50" card-height="70"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CardDeck from '@/components/CardDeck.vue';

export default defineComponent({

  name: 'PlayerPanel',

  components: {
    CardDeck,
  },

  props: {
    model: {
      type: Object,
      required: true,
    },
    actionIcon: {
      type: String,
      default: null,
    },
  },

});
</script>

<style lang="scss" scoped>
.player-panel {
  .grid-container {
    display: grid;
    grid-template-columns: 100px 100px;
  }
  background-color: rgb(228, 227, 182);
  margin-left: 5px;
  margin-right: 5px;
  padding: 10px;
  border-radius: 3px;
  .avatar {
    position: relative;
    .icon {
      border-radius: 50%;
    }
    .action {
      position: absolute;
      top: 40px;
      left: 55px;
      transform: rotate(20deg);
    }
  }
  .nickname {
    font-weight: 900;
  }
  .centered-horizontally {
    display: flex;
    justify-content: center;
  }
  .centered-vertically {
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
}
</style>
