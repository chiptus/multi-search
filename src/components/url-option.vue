<template>
  <div>
    <input
      type="checkbox"
      :name="url.id + '-enabled'"
      :id="url.id + '-enabled'"
      v-model="url.enabled"
    >
    <input name="url-name" id="url-name-input" v-model="url.name">
    <input
      type="checkbox"
      :name="url.id+'-external'"
      :id="url.id+'-external-checkbox'"
      v-model="url.external"
    >
    <label :for="url.id+'-external-checkbox'">External</label>
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
</style>
