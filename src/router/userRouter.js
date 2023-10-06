const base = '/expense-tracker';

import isAdmin from '../middleware/isAdmin';

import User from '../pages/admin/User.vue';

const userRouter = [
  {
    path: `${base}/admin/users`,
    name: 'users',
    component: User,
    meta: {
      middleware: isAdmin,
      title: 'Users',
    },
  }
];

export default userRouter;
