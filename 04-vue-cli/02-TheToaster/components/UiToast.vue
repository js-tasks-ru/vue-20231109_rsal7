<template>
  <div class='toast' :class='toast.type.className'>
    <UiIcon class='toast__icon' :icon='toast.type.icon' />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',
  props: {
    toast: {
      type: Object,
      required: true,
    },
    lifeTime: {
      type: Number,
      default: 5000,
    },
  },
  emits: [
    'needDestroy',
  ],
  components: { UiIcon },
  methods: {
    killMe() {
      console.log(this.toast.id);
      this.$emit('needDestroy', this.toast.id);
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

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
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
.toast + .toast {
  margin-top: 20px;
}
</style>
