import Vue from 'vue'
import VueRouter from 'vue-router'
import Messages from '../views/Messages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
