<template>
  <div class="flip-box">
    <transition-group name="flip">
      <div v-if="flipped" class="flip-front">
        <slot name="front">DEFAULT FRONT</slot>
      </div>
      <div v-else class="flip-back">
        <slot name="back">DEFAULT BACK</slot>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  name: 'Filp',

  props: {
    flipped: {
      type: Boolean,
      default: false,
    },
  },

});
</script>

<style lang="scss" scoped>
$rotate_deg: 180deg;  // prepend $rotate_deg value with "-" to flip the other way
$flip_speed: 0.4s;
.flip {
  &-box {
    background-color: transparent;
    width: 250px;
    height: 350px;
    perspective: 1000px;
  }
  &-enter-active,
  &-leave-active {
    position: relative;
    transition: transform $flip_speed;
    transform-style: preserve-3d;
  }
  &-enter-from {
    transform: rotateY($rotate_deg);
  }
  &-leave-to {
    transform: rotateY(-($rotate_deg));
  }
  &-front,
  &-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
}
</style>
