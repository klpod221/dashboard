import { createRouter, createWebHistory } from 'vue-router'

import auth from '../middleware/auth'
import guest from '../middleware/guest'

import Home from '../pages/Home.vue'
import Auth from '../pages/Auth.vue'

const base = '/expense-tracker'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: `${base}/`,
      name: 'home',
      component: Home,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: `${base}/login`,
      name: 'login',
      component: Auth,
      meta: {
        middleware: [guest]
      }
    }
  ]
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()

  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

  const context = {
    from,
    next,
    router,
    to
  }

  const nextMiddleware = nextFactory(context, middleware, 1)

  document.title = to.meta.title ? `${to.meta.title} | Expense Tracker` : 'Expense Tracker'

  return middleware[0]({ ...context, next: nextMiddleware })
})

export default router
