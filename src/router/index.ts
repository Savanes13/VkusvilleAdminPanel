import Authorization from '@/components/pages/authorization/Authorization.vue'
import Main from '@/components/pages/main/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/',
      component: Main,
      children: [],
      props: true,
    },
    {
      name: 'authorization',
      path: '/authorization',
      component: Authorization,
      children: [],
      props: true,
    },
  ],
})

export default router
