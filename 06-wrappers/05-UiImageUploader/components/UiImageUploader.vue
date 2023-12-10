<template>
  <div class='image-uploader'>
    <label
      class='image-uploader__preview'
      :class='{"image-uploader__preview-loading": currentState.imgClass}'

      :style="filePreview && { '--bg-url': `url(${filePreview})` }"
    >
      <span class='image-uploader__text'>{{ currentState.message }}</span>
      <input
        ref='input'
        type='file'
        accept='image/*'
        class='image-uploader__input'
        v-bind='$attrs'
        @[currentState.eventName].prevent='currentState.eventMethod'
      />
    </label>
  </div>
</template>

<script>
import * as vm from 'vm';

export default {
  name: 'UiImageUploader',
  props: {
    preview: {
      type: String,
      required: false,
    },
    uploader: {
      type: Function,
    },
  },
  inheritAttrs: false,
  emits: ['select', 'upload', 'remove', 'error'],
  data() {
    const _vm = this;
    return {
      states: {
        'empty': {
          name: 'empty',
          message: 'Загрузить изображение',
          eventName: 'change',
          eventMethod: _vm.emptyHandler,
          emitName: 'select',
          imgClass: '',
        },
        'loading': {
          name: 'loading',
          message: 'Загрузка...',
          eventName: 'click',
          eventMethod: _vm.loadingHandler,
          emitName: 'upload',
          imgClass: 'image-uploader__preview-loading',
        },
        'filled': {
          name: 'filled',
          message: 'Удалить изображение',
          eventName: 'click',
          eventMethod: _vm.filledHandler,
          emitName: 'remove',
          imgClass: '',
        },
      },

      filePreview: this.preview,
      currentState: null,
    };
  },
  methods: {
    emptyHandler(event) {
      const file = event.target.files[0];
      // this.emitState(file);
      this.filePreview = URL.createObjectURL(file);
      if (this.uploader) {
        this.setState('loading');
        this.uploadFile(file);
      } else {
        this.emitState(file);
        this.setState('filled');
      }
    },
    loadingHandler(event) {
      return false;
    },
    filledHandler(event) {
      this.clearInput();
      this.emitState();
      this.setState('empty');
    },
    uploadFile(file) {
      this.uploader(file)
        .then(data => {
          this.filePreview = data.image;
          this.emitState(data);
          this.setState('filled');
        })
        .catch(e => {
          console.warn(e);
          this.emitError(e);
          this.setState('empty');
          this.clearInput();
        });
    },
    clearInput() {
      this.$refs.input.value = '';
      this.filePreview = null;
    },
    setState(state) {
      this.currentState = this.states[state];
    },
    emitState(data = null) {
      this.$emit(this.currentState.emitName, data);
    },
    emitError(e){
      this.$emit('error', e);
    }
  },
  beforeMount() {
    this.currentState = this.preview ? this.states.filled : this.states.empty;
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
