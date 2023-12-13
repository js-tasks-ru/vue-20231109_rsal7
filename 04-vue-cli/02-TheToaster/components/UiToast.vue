<template>
  <div class='toast' :class='toastClassName'>
    <UiIcon class='toast__icon' :icon='toastIcon' />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

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
  name: 'UiToast',
  props: {
    toast: {
      type: Object,
      required: true,
      validator(value) {
        const validId = typeof value.id === 'number' || typeof value.id === 'string';
        const validToastType = toastTypes.hasOwnProperty(value.toastType);
        const validMessage = typeof value.message === 'string';
        return validId && validMessage && validToastType;
      },
    },
    lifeTime: {
      type: Number,
      default: 5000,
    },
  },
  toastTypes,
  emits: [
    'needDestroy',
  ],
  data() {
    return {
      toastClassName: toastTypes[this.toast.toastType].className,
      toastIcon: toastTypes[this.toast.toastType].icon
    }
  },
  components: { UiIcon },
  methods: {
    killMe() {
      this.$emit('needDestroy');
    },

  },
  mounted() {
    setTimeout(this.killMe, this.lifeTime);
  },
};
</script>

<style scoped>
.toast__icon {
  margin-right: 12px;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
