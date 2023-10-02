import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import fontAwesome from './plugins/font-awesome'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

const token = localStorage.getItem('token')

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT || 'https://klpod221-expense.vercel.app/'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response
  },

  (error) => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout')
    }
    return Promise.reject(error)
  }
)

app.use(router)
app.use(store)
app.use(VueSweetalert2)

app.component('font-awesome-icon', fontAwesome)

if (token) {
  store.dispatch('auth/profile')
}

app.mount('#app');
