<template>
  <ul class="search-results--nav">
    <li
      v-for="(result, index) in results"
      v-bind:key="result.name"
      class="nav-button"
      @click.stop="selectTab(index)"
      :class="selectedTab === index ? 'active' : ''"
    >
      <span>{{result.name}}</span>
      <button @click.stop="open(result)">
        <font-awesome-icon icon="external-link-alt"></font-awesome-icon>
      </button>
      <button @click.stop="refresh(result)">
        <font-awesome-icon icon="sync-alt"></font-awesome-icon>
      </button>
      <button @click.stop="closeTab(result)">
        <font-awesome-icon icon="times"></font-awesome-icon>
      </button>
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
    selectedTab: {
      type: Number,
    },
    openWindows: {
      type: Function,
      required: true,
    },
    selectTab: {
      type: Function,
      required: true,
    },
    closeTab: {
      type: Function,
      required: true,
    },
  },
  methods: {
    open(result) {
      this.openWindows([result]);
    },
    refresh(result) {
      result.url +=
        (result.url.includes('?') ? '&' : '?') + 'rand=' + Math.random() * 100;
    },
  },
};
</script>

<style scoped>
.search-results--nav {
  display: flex;
  list-style: none;
}

.search-results--nav button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.5em;
}

button:hover {
  box-shadow: 0.1em 0.1em 0.2em #9c949c;
  color: brown;
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
