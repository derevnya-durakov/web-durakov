import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CardsDemo from '@/views/CardsDemo.vue';
import Game from '@/views/Game.vue';
import Login from '@/views/Login.vue';
import Users from '@/views/Users.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demo',
    name: 'demo',
    component: CardsDemo,
  },
  {
    path: '/',
    alias: '/game',
    name: 'game',
    component: Game,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
