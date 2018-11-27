<template>
  <div id="app">
    <search-bar
      v-bind:initial-keyword="keyword"
      v-bind:on-search="search"
      v-bind:on-close="closeAllWindows"
      :urls="urls"
    ></search-bar>
    <browser :results="results"></browser>
  </div>
</template>

<script>
import * as urls from './lib/urls';
import SearchBar from './components/search-bar';
import browser from './components/browser';

export default {
  name: 'app',
  components: {
    SearchBar,
    browser,
  },
  data: () => ({
    keyword: '',
    results: [],
    currentResult: null,
    openWindows: [],
    urls: Object.keys(urls).map(name => urls[name]),
  }),
  methods: {
    closeAllWindows() {
      this.openWindows.forEach(window => window.close());
      this.openWindows.length = 0;
    },
    search(keyword) {
      this.results = [];
      this.currentResult = null;
      for (let search of this.urls) {
        if (!search.enabled) {
          continue;
        }
        // const search = this.urls[name];
        const url = search.query(keyword);
        if (search.external) {
          this.openWindows.push(window.open(url));
        } else {
          this.results.push({ url, name: search.name });
        }
      }
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
