// Add type declaration for ImportMeta
declare global {
  interface ImportMeta {
    env: {
      BASE_URL: string;
    };
  }
}

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router 