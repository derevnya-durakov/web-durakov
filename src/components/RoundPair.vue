<template>
  <div class="relative-container" :style="relativeContainerStyle">
    <card
      class="attack"
      :model="model.attack"
      :width="width"
      :height="height"
    />
    <card
      v-if="model.defence !== null"
      class="defence"
      :model="model.defence"
      :width="width"
      :height="height"
      :style="{ top: defenceTopOffset }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Card from '@/components/Card.vue';
import { CARD_WIDTH_RATIO, CARD_HEIGHT_RATIO, DEFAULT_CARD_SCALE } from '@/constants';

export default defineComponent({

  name: 'RoundPair',

  components: {
    Card,
  },

  props: {
    model: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const width = DEFAULT_CARD_SCALE * CARD_WIDTH_RATIO;
    const height = DEFAULT_CARD_SCALE * CARD_HEIGHT_RATIO;
    const _defenceTopOffsetScale = 2;
    const _defenceTopOffset = _defenceTopOffsetScale * DEFAULT_CARD_SCALE;
    return {
      width,
      height,
      defenceTopOffset: `${_defenceTopOffset}px`,
      relativeContainerStyle: { width: `${width}px`, height: `${height + _defenceTopOffset}px` },
    };
  },

});
</script>

<style lang="scss" scoped>
.relative-container {
  position: relative;
  .attack, .defence {
    position: absolute;
  }
}
</style>
