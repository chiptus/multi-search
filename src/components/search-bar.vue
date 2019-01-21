<template>
  <div class="top-bar">
    <div class="search-bar">
      <english-words-selector></english-words-selector>
      <div class="arrow">
        <font-awesome-icon icon="arrow-right" size="lg"></font-awesome-icon>
      </div>
      <search-input :on-search="onSearch"></search-input>
    </div>
    <options-bar></options-bar>
  </div>
</template>

<script>
import EnglishWordsSelector from './search-bar/english-words-selector';
import SearchInput from './search-bar/search-input';
import OptionsBar from './top-bar/options-bar';

export default {
  components: {
    OptionsBar,
    EnglishWordsSelector,
    SearchInput,
  },
  props: {
    onSearch: { type: Function, required: true },
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
</style>
