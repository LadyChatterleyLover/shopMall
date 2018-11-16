import Vue from 'vue'
import Router from 'vue-router'
import shopMall from '../pages/shopMall'
import register from '../pages/register'
import login from '../pages/login'
import goods from '../pages/goods'
import categoryList from '../pages/categoryList'
import cart from '../pages/cart'
import mainNav from '../pages/mainNav'
import member from '../pages/Member'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/mainNav',
      component: mainNav,
      children: [
        {
          path: '/',
          name: 'shopMall',
          component: shopMall
        },
        {
          path: '/categoryList',
          name: 'categoryList',
          component: categoryList
        },
        {
          path: '/cart',
          name: 'cart',
          component: cart
        },
        {
          path: '/member',
          name: 'Member',
          component: member
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
  ]
})

export default router
