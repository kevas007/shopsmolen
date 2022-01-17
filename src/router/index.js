import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Resgiter.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/User.vue')
  },
  {
    path: '/addCard',
    name: 'AddCard',
    props:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/AddCard.vue'),
   
  },
  {
    path: '/shop',
    name: 'Shop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/ShopPersonnel.vue'),
 
  },
  {
    path: '/showCard/:id',
    name: 'ShowCard',
    props:true,
    component: () => import(/* webpackChunkName: "login" */ '../components/ShowCard.vue')
  },
  {
    path: '/shops/:id',
    name: 'Shops',
    props:true,
    component: () => import(/* webpackChunkName: "login" */ '../components/Shops.vue')
  },
  {
    path: '/shopsShow/:id',
    name: 'ShopShow',
    props:true,
    component: () => import(/* webpackChunkName: "login" */ '../components/ShopShow.vue')
  },
  {
    path: '/commande/:id',
    name: 'Commande',
    props:true,
    component: () => import(/* webpackChunkName: "login" */ '../components/Commande.vue')
  },
  {
    path: '/commandes',
    name: 'Commandes',
    props:true,
    component: () => import(/* webpackChunkName: "login" */ '../components/Commandes.vue')
  },
  {
    path: '/boutique',
    name: 'Boutiques',
    props:true,
    component: () => import(/* webpackChunkName: "login" */ '../components/Boutiques.vue')
  },
  {
    path: '/panier',
    name: 'Panier',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/Panier.vue'),
 
  }
  ,{
    path:'/404',
    alias: '*',
    name:"notFound",
    component: () => import(/* webpackChunkName: "about" */ '../views/Erreur.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
