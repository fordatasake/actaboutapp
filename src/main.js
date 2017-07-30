// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App';
import router from './router';

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

window.bus = new Vue();

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {
    initMap() {
      // console.log('foo');
    }
  }
});

window.vm = vm;
