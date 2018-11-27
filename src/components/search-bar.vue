<template>
  <div class="top-bar">
    <div class="search-bar">
      <div class="english-word-selector">
        <label for="english-word-input" hidden>English word</label>
        <select v-model="englishWord" id="english-word-input">
          <option :value="null" selected disabled>English word</option>
          <option
            v-for="word in words"
            :key="word.word + word.description + word.category"
            :value="word"
          >{{word.word}} ({{word.category}})</option>
        </select>
      </div>
      <div class="search-input">
        <input
          type="text"
          v-model="keyword"
          autofocus
          placeholder="Word"
          id="keyword-input"
          v-on:keyup="submitOnEnter"
        >
        <button type="button" v-on:click="search">Search</button>
      </div>
    </div>
    <div class="options-bar">
      <button class="options-btn" @click="openModal">
        <font-awesome-icon icon="cogs"></font-awesome-icon>
      </button>
      <options-modal v-if="isModalOpen" :close="closeModal" :urls="urls" :add-url="addUrl"></options-modal>
      <!-- <input id="close-windows-checkbox" type="checkbox" checked> -->
      <!-- <label for="close-windows-checkbox">Close windows on search</label> -->
    </div>
    <!-- TODO move to browser <button v-on:click="onClose" >Close opened windows</button> -->
  </div>
</template>

<script>
import words from '../word-list.json';
import spanishWords from '../spanish-list.json';
import OptionsModal from './options-modal';

export default {
  components: {
    OptionsModal,
  },
  data() {
    return {
      keyword: this.initialKeyword,
      words,
      englishWord: null,
      isModalOpen: false,
    };
  },
  props: {
    initialKeyword: { type: String, required: true },
    onSearch: { type: Function, required: true },
    urls: { type: Array, required: true },
    addUrl: { type: Function, required: true },
    // onClose: { type: Function, required: true },
  },
  watch: {
    englishWord(newValue) {
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
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style>
.top-bar {
  height: 50px;
  padding: 1em;
  display: flex;
  justify-content: space-evenly;
}

.search-bar {
  display: flex;
  flex: 1;
  justify-content: space-evenly;
}

.options {
  width: 50px;
}

#english-word-input {
  height: 100%;
  width: 300px;
  font-size: 1.5em;
}

.search-input {
  width: 300px;
}

.search-input input {
  width: calc(100% - 55px);
  height: 100%;
  font-size: 1.5em;
}

.search-input button {
  width: 50px;
  height: 100%;
}

.options-btn {
  font-size: 2em;
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
}

.options-btn:hover {
  color: chocolate;
}

.options-btn:active {
  color: darkgoldenrod;
}
</style>
