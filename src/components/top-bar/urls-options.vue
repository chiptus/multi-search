<template>
  <div>
    <url-option v-for="url in urls" :key="url.id" :url="url" :setEngine="setEngine"></url-option>
    <button @click="addUrl">Add Url</button>
  </div>
</template>

<script>
import UrlOption from './url-option';

export default {
  components: {
    UrlOption,
  },
  props: {
    addUrl: {
      type: Function,
      required: true,
    },
    setEngine: {
      type: Function,
      required: true,
    },
    urls: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>
