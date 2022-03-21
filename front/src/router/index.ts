import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pokemonCatalog',
    component: () => import('@/pages/pokemonCatalog.vue'),
  },
  {
    path: '/pokemon/:id',
    name: 'pokemonDetailed',
    props: true,
    component: () => import('@/pages/pokemonDetailed.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
