import guest from '../middleware/guest';

import Auth from '../pages/Auth.vue';

const authRoute = [
  {
    path: `/login`,
    name: 'login',
    component: Auth,
    title: 'Login',
  },
];

authRoute.forEach((route) => {
  route.meta = {
    middleware: guest,
    layout: 'AuthLayout',
    title: route.title,
  };

  return route;
});

export default authRoute;
