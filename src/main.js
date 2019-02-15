import Vue from 'vue';
import App from './App.vue';
import { store } from './lib/store';
import initIcons from './lib/icons';

//prevent unload
window.onbeforeunload = function() {
  return "Are you sure you want to navigate away?";
}

initIcons();
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
