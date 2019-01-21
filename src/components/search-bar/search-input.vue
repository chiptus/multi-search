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
    };
  },
  computed: {
    ...mapState({
      initialKeyword: state => state.keyword,
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
      this.onSearch(this.keyword);
    },
    next() {
      this.setWordDone();
      this.nextWord();
    },
  },
};
</script>

<style>
</style>
