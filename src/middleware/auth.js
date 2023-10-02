export default function auth({ next }) {
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    return next({
      name: 'login'
    });
  }

  return next();
}
