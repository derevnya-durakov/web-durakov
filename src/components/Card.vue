<template>
  <div class="card" :style="relativeContainerStyle">
    <img
      :width="width"
      :height="height"
      :src="`/img/cards/${face}`"
      :alt="face"
      :class="{ hoverable }"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';

import { CARD_WIDTH_RATIO, CARD_HEIGHT_RATIO, DEFAULT_CARD_SCALE } from '@/constants';
import CardModel from '@/model/Card';

export default defineComponent({

  name: 'Card',

  props: {
    model: {
      type: Object,
      default: null,
    },
    scale: {
      type: Number,
      default: DEFAULT_CARD_SCALE,
    },
    hoverable: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const _model = toRef(props, 'model') as Ref<CardModel | null>;
    const _scale = toRef(props, 'scale') as Ref<number>;
    const width = computed(() => (_scale.value * CARD_WIDTH_RATIO));
    const height = computed(() => (_scale.value * CARD_HEIGHT_RATIO));
    return {
      face: computed(() => (
        (_model.value !== null)
          ? `${_model.value.suit}${_model.value.rank}.svg`
          : 'CardBack.svg'
      )),
      width,
      height,
      relativeContainerStyle: computed(() => ({ width: `${width.value}px`, height: `${height.value}px` })),
    };
  },

});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
}
.hoverable:hover {
  border-radius: 6px; // NOTE: works well only with DEFAULT_CARD_SCALE!!!
  box-shadow: 0 0 10px greenyellow;
}
</style>
