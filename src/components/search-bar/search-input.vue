<template>
  <div class="search-input">
    <input
      type="text"
      v-model="keyword"
      autofocus
      placeholder="Word"
      id="keyword-input"
      v-on:keyup="submitOnEnter"
    >
    <button type="button" @click="search" alt="Search">
      <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
    </button>
    <button type="button" alt="Next word" @click="next">
      <font-awesome-icon icon="fast-forward" size="lg"></font-awesome-icon>
    </button>
    <select v-model="siteToSearch">
      <option v-for="site in searchEngines" :key="site.id" :value="site">{{site.name}}</option>
    </select>
    <button
      class="single-site-btn"
      type="button"
      @click="searchSingleSite(siteToSearch)"
      alt="Search single site"
    >
      <font-awesome-icon icon="search" size="lg"></font-awesome-icon>Search single site
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  watch: {
    initialKeyword(newValue) {
      this.keyword = newValue;
    },
  },
  data() {
    return {
      keyword: this.initialKeyword || '',
      siteToSearch: '',
    };
  },
  mounted() {
    this.siteToSearch = this.searchEngines.length
      ? this.searchEngines[0]
      : null;
  },
  computed: {
    ...mapState({
      initialKeyword: state => state.keyword,
      searchEngines: state => state.settings.searchEngines,
    }),
  },
  props: {
    onSearch: { type: Function, required: true },
  },
  methods: {
    ...mapMutations({
      setEnglishWord: 'setEnglishWord',
      setWordDone: 'setWordDone',
      nextWord: 'nextWord',
    }),
    submitOnEnter({ keyCode }) {
      if (keyCode != 13) {
        return;
      }
      this.search();
    },
    search() {
      if (!this.keyword) {
        return;
      }
      this.onSearch(this.keyword, this.searchEngines);
    },
    searchSingleSite(site) {
      if (!site || !this.keyword) {
        return;
      }
      this.onSearch(this.keyword, [site]);
    },
    next() {
      this.setWordDone();
      this.nextWord();
    },
  },
};
</script>

<style>
.search-input {
  display: flex;
}

.search-input input {
  flex: 1;
  font-size: 1.5em;
}

.search-input button {
  width: 50px;
  height: 100%;
}

.search-input .single-site-btn {
  width: initial;
}
</style>
