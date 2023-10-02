import authService from '../services/auth.service'

const token = localStorage.getItem('token')
let initialState = { status: { loggedIn: false }, token: null, user: null }
if (token) {
  initialState = { status: { loggedIn: true }, token, user: null }
}

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, { email, password }) {
      const { token, user } = await authService.login(email, password)
      commit('loginSuccess', { token, user })
    },
    logout({ commit }) {
      authService.logout()
      commit('logout')
    },
    async profile({ commit }) {
      const { user } = await authService.profile()
      commit('setUser', user)
    },
  },
  mutations: {
    loginSuccess(state, { token, user }) {
      state.status.loggedIn = true
      state.token = token
      state.user = user
    },
    logout(state) {
      state.status.loggedIn = false
      state.token = null
      state.user = null
    },
    setUser(state, user) {
      state.user = user
    },
  },
}
