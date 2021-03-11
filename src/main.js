import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()//赋值事件总线

Vue.use(toast)//安装toast插件

//解决移动端300ms延迟
FastClick.attach(document.body)
//图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/images/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
