import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PokemonCatalog',
    component: () => import('@/pages/PokemonCatalog.vue'),
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetailed',
    props: true,
    component: () => import('@/pages/PokemonDetailed.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
