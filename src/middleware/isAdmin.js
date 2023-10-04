import store from '../store';

export default function isAdmin({ next }) {
  const isLoggedIn = store.state.auth.status.loggedIn;

  if (!isLoggedIn) {
    return next({ name: 'login' });
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user.roles === 'admin';

  if (!isAdmin) {
    return next({ name: 'home' });
  }

  return next();
}
