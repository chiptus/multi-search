<template>
  <div class="search-bar">
    <input type="text" v-model="keyword" autofocus="" 
      placeholder="Word" 
      v-on:keyup="submitOnEnter">
    <button type="button" v-on:click="search">Search</button>
    <button v-on:click="onClose" >Close opened windows</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: this.initialKeyword,
    };
  },
  props: {
    initialKeyword: { type: String, required: true },
    onSearch: { type: Function, required: true },
    onClose: { type: Function, required: true },
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
