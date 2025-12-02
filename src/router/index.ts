import Authorization from '@/components/pages/authorization/Authorization.vue'
import Registration from '@/components/pages/registration/Registration.vue'
import DefaultLayout from '@/components/layout/default/DefaultLayout.vue'
import Main from '@/components/pages/main/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/',
      component: DefaultLayout,
      children: [
        { path: "", component: Main }
      ],
      props: true,
    },
    {
      name: 'authorization',
      path: '/authorization',
      component: Authorization,
      children: []
    },
    {
      name: 'registration',
      path: '/registration',
      component: Registration,
      children: []
    },
  ],
})

export default router
