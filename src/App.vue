<template>
  <div id="app">
    <div class="search-bar">
      <p>What Spanish word would you like to multisearch? Type below, then press enter please.</p>
      <input type="text" v-model="keyword" autofocus="">
    </div>
    <div class="search-results" v-if="results.length">
      <ul>
        <li v-for="result in results" 
          v-bind:key="result.name">
          <button v-on:click="setCurrentResult(result)">{{result.name}}</button>
        </li>
      </ul>
      <vue-friendly-iframe v-if="keyword && currentResult" :src="currentResult.query(keyword)"></vue-friendly-iframe>
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
    currentResult: null,
  }),
  methods: {
    setCurrentResult(r) {
      this.currentResult = r;
    },
  },
};
</script>

<style>
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
</style>
