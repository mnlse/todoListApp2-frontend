// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
window.$ = $;


axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false
require('bootstrap/dist/css/bootstrap.min.css');

Vue.use(VueResource)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
