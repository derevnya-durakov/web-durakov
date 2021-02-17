<template>
  <div>
    <img
      :width="width"
      :height="height"
      :src="`/img/cards/${face}`"
      :alt="face"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue';

import CardModel from '@/model/Card';

export default defineComponent({

  name: 'Card',

  props: {
    model: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 350,
    },
  },

  setup(props) {
    const model = toRef(props, 'model') as Ref<CardModel | null>;
    return {
      face: computed(() => (
        (model.value !== null)
          ? `${model.value.suit}${model.value.rank}.svg`
          : 'CardBack.svg'
      )),
    };
  },

});
</script>
