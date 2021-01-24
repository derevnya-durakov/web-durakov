import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CardsDemo from '@/views/CardsDemo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Demo',
    component: CardsDemo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
