import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/auth/login',
        name: 'login',
        component: Login
    },
    {
        path: '/auth/register',
        name: 'register',
        component: Register
    }
]

export default routes