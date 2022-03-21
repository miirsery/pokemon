import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'PokemonCatalog',
        props: true,
        component: () => import('@/pages/PokemonCatalog.vue'),
      },
      {
        path: '/pokemon/:id',
        name: 'PokemonDetailed',
        props: true,
        component: () => import('@/pages/PokemonDetailed.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
