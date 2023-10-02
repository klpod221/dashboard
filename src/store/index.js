import { createStore } from 'vuex';
import { auth } from './auth.module';

const store = createStore({
  modules: {
    auth
  }
});

if (localStorage.getItem('token')) {
  store.dispatch('auth/profile')
}

export default store;
