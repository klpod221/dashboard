import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import service from './services';
import axios from './plugins/axios';
import fontAwesome from './plugins/font-awesome';
import loading from './plugins/loading';
import './plugins/vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.component('font-awesome-icon', fontAwesome);
app.use(store);
app.use(router);
app.use(VueSweetalert2);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$service = service;
app.config.globalProperties.$loading = loading;

if (localStorage.getItem('token')) {
  store.dispatch('auth/profile');
}

app.mount('#app');
