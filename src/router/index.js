import { createRouter, createWebHashHistory } from 'vue-router';

import authRoute from './authRoute';
import userRoute from './userRoute';
import adminRoute from './adminRoute';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...authRoute,
    ...adminRoute,
    ...userRoute,
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
