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
.options {
  width: 50px;
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
