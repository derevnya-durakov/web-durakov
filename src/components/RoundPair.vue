<template>
  <div class="relative-container" :style="relativeContainerStyle">
    <card
      class="attack"
      :model="model.attack"
      :hoverable="attackHoverable"
    />
    <card
      v-if="model.defence !== null"
      class="defence"
      :model="model.defence"
      :style="defenceStyle"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';
import { useStore } from 'vuex';

import Card from '@/components/Card.vue';
import { CARD_WIDTH_RATIO, CARD_HEIGHT_RATIO, DEFAULT_CARD_SCALE } from '@/constants';
import State from '@/store/State';

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
    cardScale: {
      type: Number,
      default: DEFAULT_CARD_SCALE,
    },
  },

  setup(props) {
    const _model = toRef(props, 'model'); // NOTE: to avoid "Property 'defence' does not exist on type 'RoundPair'"
                                          // we do not type '_model' as Ref<RoundPair>
    const _cardScale = toRef(props, 'cardScale') as Ref<number>;
    const _store = useStore<State>();
    const _width = computed(() => (_cardScale.value * CARD_WIDTH_RATIO));
    const _height = computed(() => (_cardScale.value * CARD_HEIGHT_RATIO));
    const _defenceTopOffsetScale = 2;
    const _defenceTopOffset = _defenceTopOffsetScale * DEFAULT_CARD_SCALE;
    return {
      defenceStyle: { top: `${_defenceTopOffset}px` },
      relativeContainerStyle: { width: `${_width.value}px`, height: `${_height.value + _defenceTopOffset}px` },
      attackHoverable: computed(() => (_store.getters.loggedIn && _store.getters.iAmDefender && (_model.value?.defence === null))),
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
