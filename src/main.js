import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import service from './services';
import axios from './plugins/axios';
import loading from './plugins/loading';
import formats from './plugins/formats';
import toast from './plugins/toast';
import './plugins/vee-validate';
import moment from 'moment';
import registerComponents from './plugins/components';

// components
import fontAwesome from './plugins/font-awesome';

const app = createApp(App);

app.use(store);
app.use(router);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$service = service;
app.config.globalProperties.$loading = loading;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$formats = formats;
app.config.globalProperties.$toast = toast;

// register components
app.component('font-awesome-icon', fontAwesome);
registerComponents(app);

if (localStorage.getItem('token')) {
  store.dispatch('auth/profile');
}

app.mount('#app');
