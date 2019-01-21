<template>
  <div class="options-bar">
    <button class="options-btn" @click="openModal">
      <font-awesome-icon icon="cogs"></font-awesome-icon>
    </button>
    <options-modal v-if="isModalOpen" :close="closeModal"></options-modal>
  </div>
</template>

<script>
import OptionsModal from './options-modal';

export default {
  components: {
    OptionsModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style>
</style>
