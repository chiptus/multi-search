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
    selectedTab: 0,
  },
  mutations: {
    openTabs(state, tabs) {
      state.openTabs = tabs;
      state.selectedTab = 0;
    },
    closeTabs(state) {
      state.openTabs = [];
    },
    toggleCloseOnSearch(state) {
      state.settings.closeWindowsOnSearch = !state.settings
        .closeWindowsOnSearch;
    },
    selectTab(state, index) {
      state.selectedTab = index;
    },
  },
});
