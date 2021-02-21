<template>
  <div class="relative-container" :style="relativeContainerStyle">
    <card
      class="attack"
      :model="model.attack"
      :selected="selected"
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
import { DEFAULT_CARD_SCALE } from '@/constants';
import State from '@/store/State';
import { useCardSize } from '@/playing-card-composable';

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
    const { width: _cardWidth, height: _cardHeight } = useCardSize(_cardScale);
    const _store = useStore<State>();
    const _defenceTopOffsetScale = 2;
    const _defenceTopOffset = _defenceTopOffsetScale * DEFAULT_CARD_SCALE;
    return {
      defenceStyle: { top: `${_defenceTopOffset}px` },
      relativeContainerStyle: { width: `${_cardWidth.value}px`, height: `${_cardHeight.value + _defenceTopOffset}px` },
      attackHoverable: computed(() => (_store.getters.loggedIn && _store.getters.iAmDefender && (_model.value?.defence === null))),
      selected: computed(() => (_model.value.attack === _store.getters.firstCardToDefend)),
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
