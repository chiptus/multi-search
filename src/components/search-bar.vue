<template>
  <div class="search-bar">
    <select v-model="selectedWord">
      <option disabled value=""></option>
      <option v-for="word in words" :key="word.word + word.description + word.category" :value="word">{{word.word}}</option>
    </select>
    <div v-if="selectedWord">{{selectedWord.category}}</div>
    <input type="text" v-model="keyword" autofocus="" 
      placeholder="Word" 
      v-on:keyup="submitOnEnter">
    <button type="button" v-on:click="search">Search</button>
    <button v-on:click="onClose" >Close opened windows</button>

  </div>
</template>

<script>
import words from '../word-list.json';
import spanishWords from '../spanish-list.json';

export default {
  data() {
    return {
      keyword: this.initialKeyword,
      words,
      selectedWord: null,
    };
  },
  props: {
    initialKeyword: { type: String, required: true },
    onSearch: { type: Function, required: true },
    onClose: { type: Function, required: true },
  },
  watch: {
    selectedWord(newValue) {
      if (!newValue) {
        return;
      }
      var spanishWord = spanishWords.find(
        w => w.english.toLowerCase() === newValue.word.toLowerCase()
      );
      this.keyword = spanishWord ? spanishWord.spanish : '';
    },
  },
  methods: {
    submitOnEnter({ keyCode }) {
      if (keyCode != 13) {
        return;
      }
      this.search();
    },
    search() {
      this.onSearch(this.keyword);
    },
  },
};
</script>

<style>
.search-bar {
  height: 50px;
  padding: 1em;
}
</style>
