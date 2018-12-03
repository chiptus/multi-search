<template>
  <modal :close="close" title="Options">
    <template slot="body">
      <urls-options :urls="urls" :addUrl="addUrl"></urls-options>
      <div>
        <input
          type="checkbox"
          name="close-checkbox"
          id="close-checkbox"
          :checked="isCloseOnSearchEnabled"
          @click="onSetCloseOnSearch"
        >
        <label for="close-checkbox">Close windows on search</label>
      </div>
    </template>
    <template slot="footer">
      <button @click="save">Save</button>
      <button @click="close">Close</button>
    </template>
  </modal>
</template>

<script>
import Modal from './modal';
import UrlsOptions from './urls-options';

export default {
  components: {
    Modal,
    UrlsOptions,
  },
  props: {
    addUrl: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
    urls: { type: Array, required: true },
    isCloseOnSearchEnabled: { type: Boolean },
    onSetCloseOnSearch: { type: Function, required: true },
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
