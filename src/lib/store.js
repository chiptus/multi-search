import Vue from 'vue';
import Vuex from 'vuex';
import * as urls from './urls';
import englishWords from '../word-list.json';
import spanishWords from '../spanish-list.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    settings: {
      searchEngines: Object.keys(urls).map(u => urls[u]),
      closeWindowsOnSearch: true,
    },
    englishWords: englishWords,
    targetLanguage: 'spanish',
    translations: {
      spanish: spanishWords,
    },
    openTabs: [],
  },
  mutations: {
    addOpenWindow(state, windowObj) {
      state.openWindows.push(windowObj);
    },
    clearWindows(state) {
      state.openWindows.length = 0;
    },
  },
});
