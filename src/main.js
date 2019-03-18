// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

import router from './router'
//import Vuex from 'vuex';
//import axios from 'axios';
//import vueResource from 'vue-resource'
import '../static/css/theme-green/index.css';

import "babel-polyfill";

import axios from 'axios'; //同域

import VueResource from 'vue-resource'; //跨域请求

Vue.use(ElementUI);
//Vue.use(Vuex);
Vue.use(VueResource);
Vue.prototype.$axios = axios;

//https://www.cnblogs.com/peachmeimei/p/8916098.html
//https://github.com/pagekit/vue-resource/blob/HEAD/docs/config.md
//Vue.http.options.emulateJSON = true;
//Vue.http.options.emulateHTTP = true;
Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   // or template: '<app/>'
//   template: '<App/>'
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
