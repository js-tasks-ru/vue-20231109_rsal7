import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      operation: 'sum',
      firstNumber: 0,
      secondNumber: 0,
    };
  },
  computed: {
    result() {
      switch (this.operation) {
        case 'sum':
          return this.firstNumber + this.secondNumber;
        case 'subtract':
          return this.firstNumber - this.secondNumber;
        case 'multiply':
          return this.firstNumber * this.secondNumber;
        case 'divide':
          return this.firstNumber / this.secondNumber;
        default:
          return null;
      }
    },
  },
});

const app = createApp(App);
app.mount('#app');
