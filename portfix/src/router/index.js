import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/components/SignUp'
import LoginPage from '@/components/LoginPage'
import Home from '@/components/Home'
import AddPortfolioPage from '@/components/AddPortfolioPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/addportfolio',
      name: 'AddPortfolioPage',
      component: AddPortfolioPage
    }
  ]
})
