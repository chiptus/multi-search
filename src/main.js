import Vue from 'vue';
import App from './App.vue';
import { store } from './lib/store';
import initIcons from './lib/icons';

initIcons();
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
