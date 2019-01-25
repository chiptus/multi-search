<template>
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
        :class="{done: word.done}"
      >{{word.word}} ({{word.category}})</option>
    </select>
    <translate-btn/>
  </div>
</template>

<script>
import TranslateBtn from './translate-btn';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    TranslateBtn,
  },
  computed: {
    ...mapState({
      englishWord: state =>
        state.englishWords[state.searchState.englishWordIndex].word,
      words: state => state.englishWords,
    }),
  },
  methods: {
    ...mapMutations({
      setEnglishWord: 'setEnglishWord',
    }),
  },
};
</script>

<style scoped>
#english-word-input {
  height: 100%;
  width: 300px;
  font-size: 1.5em;
}

.english-word-selector {
  display: flex;
}

.english-word-selector button {
  width: 50px;
}

option.done {
  background-color: chartreuse;
  color: gray;
}
</style>
