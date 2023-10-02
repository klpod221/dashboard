import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fontAwesome from './plugins/font-awesome'
import axios from 'axios'

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

app.component('font-awesome-icon', fontAwesome)

if (token) {
  await store.dispatch('auth/profile')
}

app.mount('#app');
