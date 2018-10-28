<template>
  <div id="app">
    <search-bar v-bind:initial-keyword="keyword" v-bind:on-search="search"></search-bar>
    <div class="search-results" v-if="results.length">
      <ul class="search-results--nav">
        <li v-for="result in results" 
          v-bind:key="result.name"
          class="nav-button"
          v-on:click="setCurrentResult(result)"
          :class="result === currentResult ? 'active' : ''">
          <button >{{result.name}}</button>
          <button v-on:click="open(result)"><i data-feather="external-link"/></button>
          <button v-on:click="refresh(result)"><i data-feather="refresh-cw"/></button>
        </li>
      </ul>
      <div class="browser">
        <vue-friendly-iframe 
          v-for="result in results"
            v-bind:key="result.url"
            v-if="result.url"
            v-show="currentResult == result" 
            :src="result.url">
            </vue-friendly-iframe>
      </div>
    </div>
  </div>
</template>

<script>
import * as urls from './lib/urls';
import VueFriendlyIframe from './components/vue-iframe';
import SearchBar from './components/search-bar';
import feather from 'feather-icons';

export default {
  name: 'app',
  components: {
    VueFriendlyIframe,
    SearchBar,
  },
  data: () => ({
    keyword: '',
    results: [],
    currentResult: null,
  }),
  mounted() {
    feather.replace();
  },
  methods: {
    setCurrentResult(r) {
      this.currentResult = r;
    },
    open(url) {
      window.open(url);
    },
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
      this.currentResult = this.results.length ? this.results[0] : null;
    },
    refresh(result) {
      result.url +=
        (result.url.includes('?') ? '&' : '?') + 'rand=' + Math.random() * 100;
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

.search-bar {
  height: 50px;
  padding: 1em;
}

.search-results {
  height: calc(100% - 100px);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.search-results--nav {
  display: flex;
  list-style: none;
}

.search-results--nav button {
  background: none;
  border: none;
}

.nav-button {
  cursor: pointer;
  padding: 1em;
  background-color: antiquewhite;
  border: solid 1px var(--browser-border-color);
  border-bottom: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.nav-button:hover {
  background-color: #f6cb93;
}

.nav-button:active {
  background-color: #f48e0a;
}

.nav-button.active {
  background-color: #f4a339;
}

.browser {
  border: solid 1px var(--browser-border-color);
  height: calc(100% - 2.5em);
}

button svg {
  height: 1em;
}
</style>
