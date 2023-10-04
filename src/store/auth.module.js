import authService from '../services/auth.service';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
let initialState = { status: { loggedIn: false }, token: null, user: null };
if (token) {
  initialState = { status: { loggedIn: true }, token, user: JSON.parse(user) };
}

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, { email, password }) {
      const data = await authService.login(email, password); // data = { token, user }
      commit('loginSuccess', data);
    },
    logout({ commit }) {
      authService.logout();
      commit('logout');
    },
    async profile({ commit }) {
      try {
        const user = await authService.profile();
        commit('setUser', user);
      } catch (error) {
        commit('logout');
      }
    },
  },
  mutations: {
    loginSuccess(state, { token, user }) {
      state.status.loggedIn = true;
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.token = null;
      state.user = null;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
};
