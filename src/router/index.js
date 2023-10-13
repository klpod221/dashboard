import { createRouter, createWebHistory } from 'vue-router';

import auth from '../middleware/auth';
import guest from '../middleware/guest';

import Auth from '../pages/Auth.vue';
import Home from '../pages/Home.vue';

import teamRouter from './userRouter';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: `/login`,
      name: 'login',
      component: Auth,
      meta: {
        middleware: guest,
        layout: 'AuthLayout',
        title: 'Login',
      },
    },
    {
      path: `/`,
      name: 'home',
      component: Home,
      meta: {
        middleware: auth,
        title: 'Dashboard',
      },
    },
    ...teamRouter,
  ],
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | XLU Studio` : 'XLU Studio';

  if (!to.meta.middleware) return next();

  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

  const context = {
    from,
    next,
    router,
    to,
  };

  return middleware[0]({ ...context, next: nextFactory(context, middleware, 1) });
});

export default router;
