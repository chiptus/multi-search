<template>
  <div class="url-option">
    <input
      type="checkbox"
      :name="url.id + '-enabled'"
      :id="url.id + '-enabled'"
      v-model="url.enabled"
    >
    <input name="url-name" id="url-name-input" v-model="url.name">
    <input name="url-link" id="url-link-input" v-model="url.link">
    <div>
      <input
        type="checkbox"
        :name="url.id+'-external'"
        :id="url.id+'-external-checkbox'"
        v-model="url.external"
      >
      <label :for="url.id+'-external-checkbox'">External</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
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
