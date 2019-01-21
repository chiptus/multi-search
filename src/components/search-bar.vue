<template>
  <div class="top-bar">
    <div class="search-bar">
      <div class="english-word-selector">
        <label for="english-word-input" hidden>English word</label>
        <select
          :value="englishWord"
          @change="setEnglishWord($event.target.value)"
          id="english-word-input"
        >
          <option :value="null" selected disabled>English word</option>
          <option
            v-for="word in words"
            :key="word.word + word.description + word.category"
            :value="word.word"
          >{{word.word}} ({{word.category}})</option>
        </select>
        <button type="button" alt="Translate">
          <!-- @click="translate" -->
          <font-awesome-icon icon="language" size="lg"></font-awesome-icon>
        </button>
      </div>
      <div class="arrow">
        <font-awesome-icon icon="arrow-right" size="lg"></font-awesome-icon>
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
        <button type="button" @click="search" alt="Search">
          <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
        </button>
        <button type="button" alt="Next word" @click="next">
          <font-awesome-icon icon="fast-forward" size="lg"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="options-bar">
      <button class="options-btn" @click="openModal">
        <font-awesome-icon icon="cogs"></font-awesome-icon>
      </button>
      <options-modal
        v-if="isModalOpen"
        v-bind="{ closeModal, urls, addUrl, isCloseOnSearchEnabled, onSetCloseOnSearch }"
        :close="closeModal"
        :urls="urls"
        :add-url="addUrl"
      ></options-modal>
    </div>
  </div>
</template>

<script>
import words from '../word-list.json';
import spanishWords from '../spanish-list.json';
import OptionsModal from './options-modal';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    OptionsModal,
  },
  computed: {
    ...mapState({
      englishWord: state =>
        state.englishWords[state.searchState.englishWordIndex].word,
    }),
  },
  watch: {
    initialKeyword(newValue) {
      this.keyword = newValue;
    },
  },
  data() {
    return {
      keyword: this.initialKeyword || '',
      words,
      isModalOpen: false,
    };
  },
  props: {
    initialKeyword: { type: String },
    onSearch: { type: Function, required: true },
    urls: { type: Array, required: true },
    addUrl: { type: Function, required: true },
    isCloseOnSearchEnabled: { type: Boolean },
    onSetCloseOnSearch: { type: Function, required: true },
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
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    next() {
      this.setWordDone();
      this.nextWord();
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

.search-bar .arrow {
  align-self: center;
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

.options-btn {
  font-size: 2em;
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
  align-self: center;
}

.options-btn:hover {
  color: chocolate;
}

.options-btn:active {
  color: darkgoldenrod;
}

.english-word-selector {
  display: flex;
}

.english-word-selector button {
  width: 50px;
}
</style>
