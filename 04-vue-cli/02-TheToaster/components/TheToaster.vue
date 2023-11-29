<template>
  <UiToastList>

    <UiToast
      v-for='[key, value] in toasts'
      :toast='value'
      :key='key'
      @needDestroy='destroyToast'
    />

  </UiToastList>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast';
import UiToastList from './UiToastList';

const toastTypes = {
  success: {
    icon: 'check-circle',
    className: 'toast_success',
  },
  error: {
    icon: 'alert-circle',
    className: 'toast_error',
  },
};

export default {
  name: 'TheToaster',
  toastTypes,
  data() {
    return {
      toasts: new Map(),
    };
  },

  components: { UiIcon, UiToast, UiToastList },

  methods: {
    success(message) {
      const newId = this.getNewId();
      this.toasts.set(newId, {
        id: newId,
        type: toastTypes.success,
        message,
      });
    },
    error(message) {
      const newId = this.getNewId();
      this.toasts.set(newId, {
        id: newId,
        type: toastTypes.error,
        message: message,
      });
    },
    destroyToast(toast) {
      this.toasts.delete(toast)
    },
    getNewId() {
      return Math.floor(Math.random() * Date.now());
    },
  },
};
</script>

<style scoped>
</style>
