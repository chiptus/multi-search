<template>
  <div class="top-bar">
    <search-bar :on-search="onSearch"></search-bar>
    <options-bar></options-bar>
  </div>
</template>

<script>
import OptionsBar from './options-bar';
import SearchBar from './search-bar';

export default {
  components: {
    OptionsBar,
    SearchBar,
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
</style>
