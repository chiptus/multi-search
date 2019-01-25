<template>
  <modal :close="close" title="Options">
    <template slot="body">
      <urls-options
        :urls="searchEngines"
        :addUrl="addUrl"
        :setEngine="setEngine"
        :deleteEngine="deleteEngine"
      ></urls-options>
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
import { mapState, mapMutations } from 'vuex';
import Modal from './modal';
import UrlsOptions from './urls-options';

export default {
  components: {
    Modal,
    UrlsOptions,
  },
  data() {
    return {
      enginesDirty: false,
      closeOnSearchDirty: false,
    };
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState({
      searchEngines: state => state.settings.searchEngines,
    }),
    isCloseOnSearchEnabled: {
      get() {
        return typeof this._isCloseOnSearchEnabled !== 'undefined'
          ? this._isCloseOnSearchEnabled
          : this.$store.state.settings.closeWindowsOnSearch;
      },
      set(value) {
        this._isCloseOnSearchEnabled = value;
      },
    },
  },
  methods: {
    ...mapMutations({
      setCloseOnSearch: 'setCloseOnSearch',
      saveEnginesInStore: 'saveEnginesInStore',
      deleteEngine: 'deleteEngine',
    }),
    addUrl() {
      this.searchEngines.push({});
    },
    save() {
      if (this.enginesDirty) {
        this.saveEngines();
      }
      if (this.closeOnSearchDirty) {
        this.saveCloseOnSearch();
      }
      this.close();
    },
    saveEngines() {
      this.saveEnginesInStore(this.searchEngines);
    },
    saveCloseOnSearch() {
      this.setCloseOnSearch(this._isCloseOnSearchEnabled);
    },
    onSetCloseOnSearch({ target: { checked } }) {
      this.isCloseOnSearchEnabled = checked;
      this.closeOnSearchDirty = true;
    },
    setEngine() {
      this.enginesDirty = true;
    },
  },
};
</script>

<style>
</style>
