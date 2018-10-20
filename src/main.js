import Vue from 'vue/dist/vue.js';
import App from './App.vue';
import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.component('vue-friendly-iframe', VueFriendlyIframe);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');
