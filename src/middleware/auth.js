import store from '../store'

export default function auth({ next }) {
  const isLoggedIn = store.state.auth.status.loggedIn

  if (!isLoggedIn) {
    return next({ name: 'login' })
  }

  return next()
}
