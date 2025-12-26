import Authorization from '@/components/pages/authorization/Authorization.vue'
import Registration from '@/components/pages/registration/Registration.vue'
import DefaultLayout from '@/components/layout/default/DefaultLayout.vue'
import Main from '@/components/pages/main/Main.vue'
import Dashboard from '@/components/pages/dashboard/Dashboard.vue'
import Stages from '@/components/pages/stages/Stages.vue'
import Content from '@/components/pages/content/Content.vue'
import Experts from '@/components/pages/experts/Experts.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/',
      component: DefaultLayout,
      children: [
        { path: "", component: Main },
        { path: "dashboard", component: Dashboard },
        { path: "stages", component: Stages },
        { path: "content", component: Content },
        { path: "experts", component: Experts }
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
