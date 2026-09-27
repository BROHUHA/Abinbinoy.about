import { createWebHistory, createRouter } from 'vue-router'

import FullLayout from "@/layouts/FullLayout.vue"
import MinimalLayout from "@/layouts/MinimalLayout.vue"
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/:lang(en|es)?',
    component: FullLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: MinimalLayout,
    children: [
      {
        path: '',
        component: NotFoundPage,
      },

    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
