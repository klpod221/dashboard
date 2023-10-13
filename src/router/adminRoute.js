import admin from '../middleware/admin';

import User from '../pages/admin/User.vue';

let adminRoute = [
  {
    path: `/admin/users`,
    name: 'users',
    component: User,
    title: 'Users',
  }
];

adminRoute = adminRoute.map((route) => {
  route.meta = {
    middleware: admin,
    title: route.title,
  };

  return route;
});

export default adminRoute;
