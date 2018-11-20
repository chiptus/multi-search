<template>
  <modal :close="close" title="Options">
    <template slot="body">
      <url-option v-for="url in urls" :key="url.id" :url="url"></url-option>
    </template>
    <template slot="footer">
      <button @click="save">Save</button>
      <button @click="close">Close</button>
    </template>
  </modal>
</template>

<script>
import Modal from './modal';
import UrlOption from './url-option';

export default {
  components: {
    Modal,
    UrlOption,
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
    urls: { type: Array, required: true },
  },
  methods: {
    save() {
      console.log('saving');
      this.close();
    },
  },
};
</script>

<style>
</style>
