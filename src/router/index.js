import Vue from 'vue'
import Router from 'vue-router'
import Lista from '@/views/Lista'
import Cadastro from '@/views/Cadastro'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cadastro de empresa',
      component: Cadastro
    },
    {
      path: '/lista',
      name: 'Lista de empresas',
      component: Lista
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
