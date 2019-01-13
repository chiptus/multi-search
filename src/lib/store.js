import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import * as urls from './urls';
import englishWords from '../word-list.json';
import spanishWords from '../spanish-list.json';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'multi-search',
  storage: localStorage,
});

export const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
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
    searchState: {
      englishWordIndex: 0,
      wordIndex: 0,
    },
  },
  mutations: {
    openTabs(state, tabs = []) {
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
    selectTab(state, index = 0) {
      state.selectedTab = index;
    },
    setKeyword(state, keyword = '') {
      state.keyword = keyword;
    },
    setCloseOnSearch(state, close) {
      state.settings.closeWindowsOnSearch = close;
    },
    saveEnginesInStore(state, engines) {
      state.settings.searchEngines = engines;
    },
    clearEnglishWord(state) {
      state.searchState.englishWordIndex = 0;
    },
    setWordDone(state) {
      const currentIndex = state.searchState.englishWordIndex;
      state.englishWords[currentIndex] = {
        ...state.englishWord,
        done: true,
      };
    },
    nextWord(state, index) {
      const currentIndex =
        index || index === 0 ? index : state.searchState.englishWordIndex;
      state.searchState.englishWordIndex = state.englishWords.findIndex(
        (wordObject, index) => index > currentIndex && !wordObject.done
      );
    },
    setTranslation(state, translation) {
      const currentIndex = state.searchState.englishWordIndex;
      if (!currentIndex || currentIndex === state.englishWords.length) {
        return;
      }
      const currentEnglishWord = state.englishWords[currentIndex];
      if (!currentEnglishWord) {
        return;
      }

      const translations = state.translation[state.targetLanguage].map(
        wordObject => {
          if (wordObject.english !== currentEnglishWord) {
            return wordObject;
          }
          return {
            [state.targetLanguage]: translation,
            ...wordObject,
          };
        }
      );
      state.translation[state.targetLanguage] = translations;
    },
  },
});
