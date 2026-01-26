import Authorization from '@/components/pages/authorization/Authorization.vue'
import Registration from '@/components/pages/registration/Registration.vue'
import DefaultLayout from '@/components/layout/default/DefaultLayout.vue'
import Main from '@/components/pages/main/Main.vue'
import Dashboard from '@/components/pages/dashboard/Dashboard.vue'
import Stages from '@/components/pages/stages/Stages.vue'
import Content from '@/components/pages/content/Content.vue'
import Experts from '@/components/pages/experts/Experts.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Access from '@/components/pages/access/Access.vue'
import Applicants from '@/components/pages/applicants/Applicants.vue'
import Applicant from '@/components/pages/applicant/Applicant.vue'
import Interviews from '@/components/pages/interviews/Interviews.vue'

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
        { path: "experts", component: Experts },
        { path: "access", component: Access },
        { path: "applicants", component: Applicants },
        { path: "interviews", component: Interviews },
        {
          path: 'applicant/:id',
          name: 'applicant',
          component: Applicant,
          props: true
        }
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
