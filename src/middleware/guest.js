import store from '../store';

export default function guest({ next }) {
  const isLoggedIn = store.state.auth.status.loggedIn;

  if (isLoggedIn) {
    return next({
      name: 'home'
    });
  }

  return next();
}
