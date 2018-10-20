<template>
  <div id="app">
    <div class="search-bar">
      <p>What Spanish word would you like to multisearch? Type below, then press enter please.</p>
      <input type="text" v-model="keyword" autofocus="">
      <button type="button" v-on:click="submit">Search</button>
      <button type="button" v-on:click="next">Next</button>
    </div>
    <div class="search-results">
      <!-- <vue-frame v-for="item in results" v-bind:key="item"></vue-frame> -->
      <!-- <iframe id="search-frame"></iframe> -->
      <vue-friendly-iframe v-if="results.length" :src="results[currentIndex]"></vue-friendly-iframe>
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
    results: [],
    currentIndex: 0,
  }),
  methods: {
    submit() {
      const q = this.keyword;
      this.results = [wiktionary(q), forvo(q), googleImages(q)];
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.results.length;
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
