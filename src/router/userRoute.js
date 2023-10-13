import auth from '../middleware/auth';

import Home from '../pages/Home.vue';
import Profile from '../pages/Profile.vue';

const dashboardRoute = [
  {
    path: `/`,
    name: 'home',
    component: Home,
    meta: {
      middleware: auth,
      title: 'Dashboard',
    },
  },
  {
    path: `/profile`,
    name: 'profile',
    component: Profile,
    meta: {
      middleware: auth,
      title: 'Profile',
    },
  },
];

export default dashboardRoute;
