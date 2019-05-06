<template>
  <div class="search-results" v-if="results.length">
    <browserTabs v-bind="{results, selectedTab, openWindows,selectTab, closeTab}"></browserTabs>
    <div class="browser">
      <vue-friendly-iframe
        v-for="(result, index) in results"
        v-bind:key="result.url"
        v-show="selectedTab == index"
        :src="result.url"
      ></vue-friendly-iframe>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import browserTabs from './browser-tabs';
import VueFriendlyIframe from './vue-iframe';

export default {
  components: {
    VueFriendlyIframe,
    browserTabs,
  },
  props: {
    openWindows: { type: Function },
  },
  computed: mapState({
    results: state => state.openTabs,
    selectedTab: state => state.selectedTab,
  }),
  methods: {
    ...mapMutations({
      selectTab: 'selectTab',
      closeTab: 'closeTab',
    }),
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
