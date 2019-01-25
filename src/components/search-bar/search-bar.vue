<template>
  <div class="search-bar">
    <english-words-selector></english-words-selector>
    <div class="arrow">
      <font-awesome-icon icon="arrow-right" size="lg"></font-awesome-icon>
    </div>
    <search-input :on-search="onSearch"></search-input>
  </div>
</template>

<script>
import EnglishWordsSelector from './english-words-selector';
import SearchInput from './search-input';

export default {
  components: {
    EnglishWordsSelector,
    SearchInput,
  },
  props: {
    onSearch: { type: Function, required: true },
  },
};
</script>

<style>
.search-bar {
  display: flex;
  flex: 1;
  justify-content: space-evenly;
}

.search-bar .arrow {
  align-self: center;
}
</style>
