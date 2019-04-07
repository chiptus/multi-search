<template>
  <div id="app">
    <top-bar v-bind="{
        onSearch: search,
      }"></top-bar>
    <browser v-bind="{openWindows}"></browser>
  </div>
</template>

<script>
import TopBar from './components/top-bar';
import browser from './components/browser';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
    TopBar,
    browser,
  },
  computed: mapState({
    urls: state => state.settings.searchEngines,
    isCloseOnSearchEnabled: state => state.settings.closeWindowsOnSearch,
    keyword: state => state.keyword,
  }),
  data: () => ({
    openedWindows: [],
  }),
  methods: {
    ...mapMutations({
      openTabs: 'openTabs',
      closeTabs: 'closeTabs',
      onSetCloseOnSearch: 'toggleCloseOnSearch',
      setKeyword: 'setKeyword',
      nextWord: 'nextWord',
    }),
    closeAllWindows() {
      this.openedWindows.forEach(w => w.close());
      this.openedWindows.length = 0;
    },
    async searchSingleSite(keyword, searchEngine) {
      if (!keyword) {
        return;
      }
      const url = searchEngine.replace('%s', keyword);
      const result = { url, ...searchEngine };
      if (searchEngine.external) {
        return this.openWindows(result);
      }
      this.openTabs(result);
    },
    async search(keyword, searchEngines) {
      this.setKeyword(keyword);
      if (!keyword) {
        return;
      }
      if (this.isCloseOnSearchEnabled) {
        this.closeAllWindows();
        this.closeTabs();
      }
      const results = searchEngines
        .filter(e => e.enabled)
        .map(engine => ({
          url: engine.link.replace('%s', keyword),
          ...engine,
        }));
      this.openTabs(results.filter(r => !r.external));
      await wait(3);
      this.openWindows(results.filter(r => r.external));
    },
    openWindows(windows) {
      this.openedWindows = this.openedWindows.concat(
        windows.map(w => window.open(w.url))
      );
    },
  },
};

function wait(seconds) {
  return new Promise(res => setTimeout(res, seconds * 1000));
}
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
