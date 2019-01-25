<template>
  <div class="url-option">
    <input
      type="checkbox"
      :name="url.id + '-enabled'"
      :id="url.id + '-enabled'"
      v-model="url.enabled"
      @change="onSetEngine"
    >
    <input name="url-name" id="url-name-input" v-model="url.name" @change="onSetEngine">
    <input name="url-link" id="url-link-input" v-model="url.link" @change="onSetEngine">
    <div>
      <input
        type="checkbox"
        :name="url.id+'-external'"
        :id="url.id+'-external-checkbox'"
        v-model="url.external"
        @change="onSetEngine"
      >
      <label :for="url.id+'-external-checkbox'">External</label>
    </div>
    <div>
      <button @click="deleteUrl(url)">
        <font-awesome-icon icon="times-circle"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
    },
    setEngine: {
      required: true,
      type: Function,
    },
    deleteUrl: {
      required: true,
      type: Function,
    },
  },
  methods: {
    onSetEngine() {
      this.setEngine(this.url);
    },
  },
};
</script>

<style>
.url-option {
  display: flex;
  justify-content: space-between;
}

#url-link-input {
  flex: 1;
}
</style>
