import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSyncAlt,
  faExternalLinkAlt,
  faCogs,
  faSearch,
  faArrowRight,
  faFastForward,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { store } from './lib/store';
library.add(
  faSyncAlt,
  faExternalLinkAlt,
  faCogs,
  faSearch,
  faArrowRight,
  faFastForward,
  faLanguage
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
