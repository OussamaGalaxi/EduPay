import { createApp } from 'vue';
import 'vue3-toastify/dist/index.css';

import App from '@/App.vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
// Styles
import '@core/scss/template/index.scss';
import '@styles/styles.scss';
import webSocketPlugin from './plugins/webSocketPlugin';
import { useAuthStore } from './store/useAuthStore';
import { useCounterStore } from './store/useCounterStore';

// Create Vue app
const app = createApp(App);
// Register plugins
registerPlugins(app);

const counterStore = useCounterStore();
app.provide('counterStore', counterStore);

app.use(Vue3Toastify, {
  autoClose: 1000,
} as ToastContainerOptions);

// Check for existing token and initialize WebSocket connection
const token = (useCookie('accessToken').value);

// if (token && !useAuthStore().ws_state) {
//   console.error('main ws');

//   console.warn('💥💥💥💥' + token + '💥💥💥')
//   app.config.globalProperties.$initWebSocketConnection(token);
// }if (!authStore.ws_state) {

const authStore = useAuthStore()
console.error("MAIN");

const instance = getCurrentInstance()
instance?.appContext.config.globalProperties.$initWebSocketConnection(authStore.accessToken);

app.use(webSocketPlugin);
// Mount Vue app
app.mount('#app');
