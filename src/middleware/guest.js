export default function guest({ next }) {
  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn) {
    return next({
      name: 'home'
    });
  }

  return next();
}
