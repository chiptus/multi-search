<template>
  <div id="app">
    <search-bar v-bind:initial-keyword="keyword" v-bind:on-search="search"></search-bar>
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
  }),
  methods: {
    search(keyword) {
      this.results = [];
      this.currentResult = null;
      for (let name in urls) {
        const search = urls[name];
        const url = search.query(keyword);
        if (search.external) {
          window.open(url);
        } else {
          this.results.push({ url, name });
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
