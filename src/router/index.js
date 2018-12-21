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
    {
      path: '/range',
      name: 'range',
      component: resolve => require(['@/components/range/example'], resolve)
    },
    {
      path: '/tableColumnFilter',
      name: 'tableColumnFilter',
      component: resolve => require(['@/components/tableColumnFilter/example'], resolve)
    },
    {
      path: '/slider',
      name: 'slider',
      component: resolve => require(['@/components/slider/sliderBlock'], resolve)
    },
    {
      path: '/complexTable',
      name: 'complexTable',
      component: resolve => require(['@/components/complexTable/example'], resolve)
    },
    {
      path: '/tipModal',
      name: 'tipModal',
      component: resolve => require(['@/components/tip-modal/example'], resolve)
    },
  ]
})
