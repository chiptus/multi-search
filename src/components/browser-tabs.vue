<template>
  <ul class="search-results--nav">
    <li v-for="result in results" 
      v-bind:key="result.name"
      class="nav-button"
      v-on:click="setResult(result)"
      :class="result === currentResult ? 'active' : ''">
      <button >{{result.name}}</button>
      <button v-on:click="open(result)"><font-awesome-icon icon="external-link-alt"></font-awesome-icon></button>
      <button v-on:click="refresh(result)"><font-awesome-icon  icon="sync-alt"></font-awesome-icon></button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true,
    },
    setResult: {
      type: Function,
      required: true,
    },
    currentResult: {
      type: Object,
    },
  },
  methods: {
    open(result) {
      window.open(result.url);
    },
    refresh(result) {
      result.url +=
        (result.url.includes('?') ? '&' : '?') + 'rand=' + Math.random() * 100;
    },
  },
};
</script>

<style>
.search-results--nav {
  display: flex;
  list-style: none;
}

.search-results--nav button {
  background: none;
  border: none;
}

.nav-button {
  cursor: pointer;
  padding: 1em;
  background-color: antiquewhite;
  border: solid 1px var(--browser-border-color);
  border-bottom: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.nav-button:hover {
  background-color: #f6cb93;
}

.nav-button:active {
  background-color: #f48e0a;
}

.nav-button.active {
  background-color: #f4a339;
}

button svg {
  height: 1em;
}
</style>
