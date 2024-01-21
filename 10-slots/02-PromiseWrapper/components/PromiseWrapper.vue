<template>
    <slot name='pending' v-if='currentState==="loading"'/>
    <slot :error='error' name='rejected' v-else-if='currentState==="rejected"'/>
    <slot :result='result' name='fulfilled' v-else-if='currentState==="fullFilled"'/>
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
