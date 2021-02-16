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
import { computed, defineComponent, toRefs } from 'vue';

import { Rank } from '@/enums';

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
    const { model } = toRefs(props);
    return {
      face: computed(() => (
        model.value
          ? `${model.value.suit}${Rank[model.value.rank]}.svg`
          : 'CardBack.svg'
      )),
    };
  },

});
</script>
