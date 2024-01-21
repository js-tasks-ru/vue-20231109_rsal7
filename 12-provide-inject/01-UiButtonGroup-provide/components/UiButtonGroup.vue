<template>
  <div class="button-group" role="group">
    <slot/>
  </div>
</template>

<script>
import {computed} from 'vue';

export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  provide() {
    return {
      setActiveBtn: (value) => this.$emit('update:modelValue', value),
      model: computed(() => this.modelValue),
    }
  },

  emits: ['update:modelValue'],
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
