// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import ElementUI from 'element-ui'
import './assets/sass/reset.scss'//初始化样式
import './assets/sass/config.scss'
import 'element-ui/lib/theme-chalk/index.css'//第三方UI库样式
import './assets/sass/layout.scss'//更换elementUI组件的样式

import inter from './commons/interface.js'
import funcs from './commons/funcs.js'

Vue.use(inter)
Vue.use(funcs)
Vue.use(Vuex)

Vue.use(ElementUI)
Vue.use(iView);

Vue.config.productionTip = false

Vue.prototype.$get = function (url, params,success, error) {
  $.ajax({
    type: "get",
    data: params,
    url: url,
    // header:header,
    contentType: "application/x-www-form-urlencoded",
    dataType: 'json',
    success: success,
    error: error
  })
}

Vue.prototype.$post = function (url, params,success, error) {
  $.ajax({
    type: 'post',
    data: params,
    url: url,
    contentType: "application/json",
    dataType: "json",
    success: success,
    error: error
  })
}
Vue.prototype.$postNoContent = function (url, params,success, error) {
  $.ajax({
    type: 'post',
    data: params,
    url: url,
    // contentType: "application/json",
    dataType: "json",
    success: success,
    error: error
  })
}
Vue.prototype.$uploadFile = function (url, params,success, error) {
  $.ajax({
    type: 'post',
    data: params,
    url: url,
    accepts: {
      text: "application/json;charset=utf-8"
    },
    // contentType: "application/json",
    contentType:false,
    processData:false,
    dataType: 'json',
    mimeType:"multipart/form-data",
    success: success,
    error: error
  })
}
/* eslint-disable no-new */

var store=new Vuex.Store({
  state:{
    activeIndex:'',
    adminEnable:false
  },
  mutations:{
    setActiveIndex(state,str){
      state.activeIndex=str;
    },
    setAdminEnable(state){
      state.adminEnable=true
    },
    setAdminDisable(state){
      state.adminEnable=false
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/**
 * 自适应宽度
 *
 */
;(function (doc, win) {
  var docEl = doc.documentElement;
  var resizeEvt,recalc;
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth <= 1024) {
        docEl.style.fontSize = '100px';
      }else if(clientWidth > 1440){
        docEl.style.fontSize = '140px';
      }
      else {
        docEl.style.fontSize = 100 * (clientWidth / 1024) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();
})(document, window);
