import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '../modules/Auth/routes'


const routes =  [
    ...authRoutes,
   
]

let router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;