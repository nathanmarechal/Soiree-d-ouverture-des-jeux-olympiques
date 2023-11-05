import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/index'
import 'jquery/dist/jquery.slim.min.js';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
