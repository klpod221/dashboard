import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }
  ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} | Expense Tracker` : 'Expense Tracker';
    next();
});

export default router;
