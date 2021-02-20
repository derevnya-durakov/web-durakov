<template>
  <div class="player-panel">
    <div class="grid-container">
      <div>
        <div class="avatar">
          <img class="icon" width="100" src="/img/avatar.png">
          <template v-if="actionIcon !== null">
            <img class="action" width="40" :src="`/img/actions/${actionIcon}.png`">
          </template>
          <img v-if="model.saidBeat" class="said-beat" width="40" src="/img/black-flag.png">
          <img v-else-if="isTaking" class="said-beat" width="40" src="/img/white-flag.png">
        </div>
        <div class="nickname">{{model.user.nickname}}</div>
      </div>
      <div class="centered-horizontally">
        <div class="centered-vertically">
          <card-deck
            :deck-size="model.handSize"
            :card-scale="10"
          />
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
    isTaking: {
      type: Boolean,
      defalut: false,
    },
  },

});
</script>

<style lang="scss" scoped>
.player-panel {
  z-index: 1;
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
    .action, .said-beat {
      position: absolute;
      top: -5px;
    }
    .action {
      right: -5px;
    }
    .said-beat {
      left: -5px;
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
