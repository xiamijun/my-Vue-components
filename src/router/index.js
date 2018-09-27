import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve)
    },
    {
      path: '/chooseWeek',
      name: 'chooseWeek',
      component: resolve => require(['@/components/chooseWeek/example'], resolve)
    },
    {
      path: '/passwordConfirm',
      name: 'passwordConfirm',
      component: resolve => require(['@/components/passwordConfirm/passwordConfirm'], resolve)
    },
    {
      path: '/sequentCheckbox',
      name: 'sequentCheckbox',
      component: resolve => require(['@/components/sequentCheckbox/example'], resolve)
    },
    {
      path: '/inputNumber',
      name: 'inputNumber',
      component: resolve => require(['@/components/inputNumber/example'], resolve)
    },
    {
      path: '/selectUser',
      name: 'selectUser',
      component: resolve => require(['@/components/selectUser/example'], resolve)
    },
    {
      path: '/dateSelect',
      name: 'dateSelect',
      component: resolve => require(['@/components/dateSelect/example'], resolve)
    },
  ]
})
