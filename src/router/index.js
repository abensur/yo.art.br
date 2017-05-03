import Vue from 'vue'
import Router from 'vue-router'
import Lista from '@/views/Lista'
import Cadastro from '@/views/Cadastro'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [{
    path: '/',
    name: 'default',
    redirect: 'lista'
  }, {
    path: '/lista',
    name: 'lista',
    component: Lista
  }, {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }]
})
