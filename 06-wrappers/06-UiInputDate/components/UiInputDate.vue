<template>
  <UiInput
    :type='type'
    v-model='localModelValue'
    :step='step'
    ref='igor'
  >
    <template v-if='$slots["left-icon"]' #left-icon>
      <slot name='left-icon' />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

const addZero = function(number) {
  return +number < 10 ? `0${number}` : `${number}`;
};
const getStringTimeFromInt = function(number, step = 60) {
  const date = new Date(number);
  let dateString = `${addZero(date.getUTCHours())}:${addZero(date.getUTCMinutes())}`;
  if (step % 60 !== 0) {
    dateString = dateString + `:${addZero(date.getSeconds())}`;
  }
  return dateString;
};

const getStringDateFromInt = function(number) {
  const date = new Date(number);
  return `${date.getUTCFullYear()}-${addZero(date.getUTCMonth() + 1)}-${addZero(date.getUTCDate())}`;
};

const getLocalDateFromInt = function(number) {
  return `${getStringDateFromInt(number)}T${getStringTimeFromInt(number)}`;
};

export default {
  name: 'UiInputDate',
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    step: {
      type: [String, Number],
    },
  },
  components: { UiInput },
  events: ['update:modelValue'],
  computed: {
    localModelValue: {
      get() {
        if (this.modelValue) {
          if (this.type === 'time')
            return getStringTimeFromInt(this.modelValue, this.step);
          else if (this.type === 'date')
            return getStringDateFromInt(this.modelValue);
          else
            return getLocalDateFromInt(this.modelValue);
        }
        return '';
      },
      set(value) {
        this.$emit('update:modelValue', this.$refs.igor.$refs.input.valueAsNumber);
      },
    },
  },
};
</script>
