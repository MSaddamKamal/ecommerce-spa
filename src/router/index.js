import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '../modules/Auth/routes'
import productRoutes from '../modules/Product/routes'
import cartRoutes from '../modules/Cart/routes'

const routes =  [
    ...authRoutes,
    ...productRoutes,
    ...cartRoutes
]

let router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;