import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSyncAlt,
  faExternalLinkAlt,
  faCogs,
  faSearch,
  faArrowRight,
  faFastForward,
  faLanguage,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default function initIcons() {
  library.add(
    faSyncAlt,
    faExternalLinkAlt,
    faCogs,
    faSearch,
    faArrowRight,
    faFastForward,
    faLanguage,
    faTimesCircle
  );
  Vue.component('font-awesome-icon', FontAwesomeIcon);
}
