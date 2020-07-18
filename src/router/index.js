import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginRegister from '../views/sesion/LoginRegister.vue'
import Register from '../views/sesion/Register.vue'
import Main from '../views/aplication/Main.vue'
import Configuration from '../views/aplication/Configuration.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/sesion/loginRegister',
    name: 'loginRegister',
    component: LoginRegister
  },
  {
    path: '/sesion/register',
    name: 'register',
    component: Register
  },
  {
    path: '/main/',
    name: 'main',
    component: Main,
    children:[
      {
        path: 'configuration',
        name: 'configuration',
        component: Configuration 
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
