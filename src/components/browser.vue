<template>
   <div class="search-results" v-if="results.length">
      <browserTabs v-bind:results="results" 
        :current-result="currentResult"
        :set-result="setCurrentResult"></browserTabs>
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
</template>

<script>
import browserTabs from './browser-tabs';
import VueFriendlyIframe from './vue-iframe';

export default {
  components: {
    VueFriendlyIframe,
    browserTabs,
  },
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
  watch: {
    results() {
      this.currentResult = this.results.length ? this.results[0] : null;
    },
  },
  data() {
    return {
      currentResult: null,
    };
  },
  methods: {
    setCurrentResult(r) {
      this.currentResult = r;
    },
  },
};
</script>

<style>
.browser {
  border: solid 1px var(--browser-border-color);
  height: calc(100% - 2.5em);
}

.search-results {
  height: calc(100% - 100px);
}
</style>
