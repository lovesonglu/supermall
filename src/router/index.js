import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home,
    },
    {
      path: '/category',
      component:Category,
    },
    {
      path: '/cart',
      component:Cart,
    },
    {
      path: '/profile',
      component:Profile,
    },
    {
      path: '/detail/:iid',
      component:Detail,
    }
  ],
  mode:'history'
})
