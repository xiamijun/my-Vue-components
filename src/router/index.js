import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve=>require(['@/pages/index'],resolve)
    },
    {
      path: '/chooseWeek',
      name: 'chooseWeek',
      component: resolve=>require(['@/components/chooseWeek/chooseWeek'],resolve)
    },
    {
      path: '/passwordConfirm',
      name: 'passwordConfirm',
      component: resolve=>require(['@/components/passwordConfirm/passwordConfirm'],resolve)
    },
  ]
})
