<template>
  <UiToastList>

    <UiToast
      v-for='[key, value] in toasts'
      :toast='value'
      :key='key'
      @needDestroy='destroyToast(value.id)'
    />

  </UiToastList>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast';
import UiToastList from './UiToastList';


export default {
  name: 'TheToaster',
  data() {
    return {
      toasts: new Map(),
    };
  },

  components: { UiIcon, UiToast, UiToastList },

  methods: {
    success(message) {
      this.createToast('success', message);
    },
    error(message) {
      this.createToast('error', message);
    },
    createToast(type, message) {
      const newId = Math.floor(Math.random() * Date.now());
      this.toasts.set(newId, {
        id: newId,
        toastType: type,
        message: message,
      });
    },
    destroyToast(toastId) {
      this.toasts.delete(toastId);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}


.toast + .toast {
  margin-top: 20px;
}


</style>
