<template>
  <div class="card" :style="relativeContainerStyle">
    <img
      :width="width"
      :height="height"
      :src="`/img/cards/${face}`"
      :alt="face"
      :class="{ hoverable, selected }"
      @click="emitCardClick"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';

import { DEFAULT_CARD_SCALE, EVENT_CARD_CLICK } from '@/constants';
import { Card } from '@/domain';
import { useCardSize } from '@/playing-card-composable';

export default defineComponent({

  name: 'Card',

  emits: [ EVENT_CARD_CLICK ],

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
    selected: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit: _emit }) {
    const _model = toRef(props, 'model') as Ref<Card | null>;
    const _scale = toRef(props, 'scale') as Ref<number>;
    const { width, height } = useCardSize(_scale);
    return {
      face: computed(() => (
        (_model.value !== null)
          ? `${_model.value.suit}${_model.value.rank}.svg`
          : 'CardBack.svg'
      )),
      width,
      height,
      relativeContainerStyle: computed(() => ({ width: `${width.value}px`, height: `${height.value}px` })),
      emitCardClick() {
        _emit(EVENT_CARD_CLICK, _model.value);
      },
    };
  },

});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
}
.hoverable:hover, .selected {
  border-radius: 6px; // NOTE: works well only with DEFAULT_CARD_SCALE = 25!!!
                      // Explanation of Magic: SVG card images have its own border radius (12px). and their default
                      // sizes are 250px at width and 350px at height. applying high maths we get card ratio 5/7.
                      // then, applying DEFAULT_CARD_SCALE=25 to this ratio, we get card sizes 125px/175px what is
                      // twice less than the original sizes. thus, the border radius should be twice less also.
                      // so it is 6px.
  box-shadow: 0 0 10px greenyellow;
}
</style>
