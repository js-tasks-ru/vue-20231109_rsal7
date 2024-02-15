import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Решение
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const progressInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

  const progress = {

    start(key){
      progressInstance.start(key)
    },
    finish(key){
      progressInstance.finish(key);
    },
    fail(){
      progressInstance.fail();
    },
    install(app) {
      app.provide(PROGRESS_KEY, progress);
    },
  };
  if(router){
    router.beforeEach((to) => {
      progressInstance.start(to)
    })
    router.afterEach((to) => {
      progressInstance.finish(to)
    })
    router.onError(() => {
      progressInstance.fail()
    })
  }

  return progress;
}
