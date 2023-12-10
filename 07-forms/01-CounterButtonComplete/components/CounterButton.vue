<template>
  <button @click='$emit("update:count", ++localCount)'>
    {{ localCount }}
  </button>
</template>
<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      localCount: 0
    }
  },
  emits: ['update:count'],
  watch: {
    count: {
      immediate: true,
      handler() {
        this.localCount = this.count;
      },
    },
  },
};
</script>
