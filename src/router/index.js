import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
});

router.beforeEach((to, from, next) => {
  const name = to.name.charAt(0).toUpperCase() + to.name.slice(1);
  document.title = `${name} | Expense Tracker`;
  next();
});

export default router;
