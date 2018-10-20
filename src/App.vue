<template>
  <div id="app">
    <div class="search-bar">
      <input type="text" v-model="keyword" autofocus="" placeholder="Word">
    </div>
    <div class="search-results" v-if="results.length">
      <ul class="search-results--nav">
        <li v-for="result in results" 
          v-bind:key="result.name"
          v-on:click="setCurrentResult(result)"
          class="nav-button"
          :class="result === currentResult ? 'active' : ''">
          {{result.name}}
        </li>
      </ul>
      <div class="browser">
        <vue-friendly-iframe 
          v-for="result in results"
            v-bind:key="result.name"
            v-if="keyword"
            v-show="currentResult == result" :src="result.query(keyword)"></vue-friendly-iframe>
      </div>
    </div>
  </div>
</template>

<script>
import VueFriendlyIframe from 'vue-friendly-iframe';
import { googleImages, forvo, wiktionary } from './lib/urls';

export default {
  name: 'app',
  components: {
    VueFriendlyIframe,
  },
  data: () => ({
    keyword: '',
    results: [wiktionary, forvo, googleImages],
    currentResult: wiktionary,
  }),
  methods: {
    setCurrentResult(r) {
      this.currentResult = r;
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
</style>
