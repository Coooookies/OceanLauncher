import { createApp } from 'vue'
import { createPinia } from 'pinia';
import createRouter from './router';

import '@/global/style/index.scss';

import App from './App.vue'
import GameManager from './game'
import { i18n } from '@/global/i18n'

const errorHandler = (error: unknown) => {
  console.error(error);
}

const app = createApp(App);
const gameManagerInstance = new GameManager();


app.config.globalProperties.$GameManager = gameManagerInstance;
// window.onerror = errorHandler
// app.config.errorHandler = errorHandler
app.use(createPinia());
app.use(createRouter);
app.use(i18n);
app.mount('#app')
  .$nextTick(() => {


    setTimeout(() => {
      window.removeLoading();
    }, 300);
  })