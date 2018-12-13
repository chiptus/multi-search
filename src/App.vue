<template>
  <div id="app">
    <search-bar
      v-bind="{
        initialKeyword: keyword,
        onSearch: search,
        onClose: closeAllWindows,
        urls,
        addUrl,
        isCloseOnSearchEnabled,
        onSetCloseOnSearch
      }"
    ></search-bar>
    <browser :results="results"></browser>
  </div>
</template>

<script>
import SearchBar from './components/search-bar';
import browser from './components/browser';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    SearchBar,
    browser,
  },
  computed: mapState({
    urls: state => state.settings.searchEngines,
    isCloseOnSearchEnabled: state => state.settings.closeWindowsOnSearch,
  }),
  data: () => ({
    keyword: '',
    results: [],
    currentResult: null,
    openWindows: [],
  }),
  methods: {
    closeAllWindows() {
      this.openWindows.forEach(window => window.close());
      this.openWindows.length = 0;
    },
    addUrl() {
      this.urls.push({});
    },
    search(keyword) {
      if (this.isCloseOnSearchEnabled) {
        this.closeAllWindows();
      }
      this.results = [];
      this.currentResult = null;
      for (let search of this.urls) {
        if (!search.enabled) {
          continue;
        }
        const url = search.link.replace('%s', keyword);
        if (search.external) {
          this.openWindows.push(window.open(url));
        } else {
          this.results.push({ url, name: search.name });
        }
      }
    },
    onSetCloseOnSearch() {
      this.isCloseOnSearchEnabled = !this.isCloseOnSearchEnabled;
    },
  },
};
</script>

<style>
:root {
  --browser-border-color: #9b6f35;
}

iframe {
  height: 100%;
  width: 100%;
  border: 0;
}

div.vue-friendly-iframe {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  height: 100vh;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
