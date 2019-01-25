import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import * as urls from './urls';
import englishWords from '../word-list.json';
import spanishWords from '../spanish-list.json';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'multi-search',
  // modules: ['settings', 'translations', 'searchState'],
  reducer({ settings, translations, searchState, keyword }) {
    return {
      settings,
      translations,
      searchState,
      keyword,
    };
  },
});

export const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    keyword: '',
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
    setEnglishWord(state, word) {
      state.searchState.englishWordIndex = state.englishWords.findIndex(
        wordObject => wordObject.word === word
      );
      const translations = state.translations[state.targetLanguage];
      state.searchState.wordIndex = translations.findIndex(
        wordObject => wordObject.english === word
      );
      state.keyword =
        state.searchState.wordIndex > -1
          ? translations[state.searchState.wordIndex].spanish
          : '';
    },
    setWordDone(state) {
      const currentIndex = state.searchState.englishWordIndex;
      state.englishWords[currentIndex] = {
        ...state.englishWords[currentIndex],
        done: true,
      };
    },
    nextWord(state, index) {
      const currentIndex =
        index || index === 0 ? index : state.searchState.englishWordIndex;
      state.searchState.englishWordIndex = state.englishWords.findIndex(
        (wordObject, index) => index > currentIndex && !wordObject.done
      );
      const currentWord =
        state.englishWords[state.searchState.englishWordIndex];
      const translations = state.translations[state.targetLanguage];
      state.searchState.wordIndex = translations.findIndex(
        wordObject => wordObject.english === currentWord.word
      );
      state.keyword =
        state.searchState.wordIndex > -1
          ? translations[state.searchState.wordIndex].spanish
          : '';
    },
    deleteEngine(state, engine) {
      state.settings.searchEngines = state.settings.searchEngines.filter(
        e => e.name !== engine.name
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
