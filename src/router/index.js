import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import iPhone from '../views/iPhone.vue'
import iPad from '../views/iPad.vue'
import Mac from '../views/Mac.vue'
import Orders from '../views/Orders.vue'
import AddNewItems from '../components/admin/AddNewItems.vue'
import Login from '../components/admin/Login.vue'

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/iPhone',
    name: 'iPhone',
    component: iPhone
  },
  {
    path: '/iPad',
    name: 'iPad',
    component: iPad
  },
  {
    path: '/Mac',
    name: 'Mac',
    component: Mac
  },
  
  {
    path: '/AddNewItems',
    name: 'AddNewItems',
    component: AddNewItems,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addNew',
    name: 'addNew',
    component: AddNewItems,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    redirect: '/',
  },
]


})


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else next();
});

export default router
