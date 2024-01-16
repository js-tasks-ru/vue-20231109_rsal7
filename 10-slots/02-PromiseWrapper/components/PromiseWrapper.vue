<template>
  <div v-if='currentState==="loading"'>
    <slot name='pending' />
  </div>
  <div v-else-if='currentState==="rejected"'>
    <slot :error='error' name='rejected' />
  </div>
  <div v-else-if='currentState==="fullFilled"'>
    <slot :result='result' name='fulfilled' />
  </div>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data() {
    return {
      currentState: 'loading',
      result:  null,
      error: null,
    };
  },
  watch: {
    promise: {
      immediate: true,
      async handler() {
        this.currentState = 'loading';
        this.result = null;
        this.error = null;
        try {
          this.result = await this.promise;
          this.currentState = 'fullFilled';
        } catch (e) {
          this.currentState = 'rejected';
          this.error = e;
        }
      },
    },
  },
};
</script>
