import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MatchDetails from './views/MatchDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/match/:id',
      name: 'MatchDetails',
      component: MatchDetails
    }
  ]
})
