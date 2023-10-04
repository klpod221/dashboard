import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './plugins/axios';
import fontAwesome from './plugins/font-awesome';
import './plugins/vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.component('font-awesome-icon', fontAwesome);
app.config.globalProperties.$axios = axios;
app.use(store);
app.use(router);
app.use(VueSweetalert2);

app.mount('#app');
