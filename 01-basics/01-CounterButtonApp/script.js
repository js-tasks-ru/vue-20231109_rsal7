import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',
  data(){
    return {
      counter: 1
    }
  }
});

const app = createApp(App);
app.mount('#app');
