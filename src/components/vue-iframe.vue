<template>
<div class="vue-friendly-iframe">
  <div v-if="errorLoad">Error Loading (open in external tab)</div>
</div>
</template>

<script>
import uuidV1 from 'uuid/v1';

import { debounce } from '../lib/debounce';

function generateGuid() {
  return uuidV1();
}

export default {
  name: 'friendly-iframe',
  props: {
    src: {
      type: String,
      required: true,
    },
    // scrollable: {
    //   type: Boolean,
    //   required: false
    // },
    className: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      iframeEl: null,
      iframeLoadedMessage: `LOADED_IFRAME_${generateGuid()}`,
      errorLoad: false,
    };
  },
  computed: {},
  watch: {
    src() {
      this.reinitIframe(this);
    },
  },
  methods: {
    removeIframe() {
      if (this.iframeEl) {
        this.iframeEl.remove();
      }
    },
    setIframeUrl() {
      const iframeDoc = this.iframeEl.contentWindow.document;
      iframeDoc
        .open()
        .write(
          `<body onload="window.location.href='${
            this.src
          }'; parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>`
        );

      iframeDoc.close(); //iframe onload event happens
    },
    reinitIframe: debounce(vm => {
      vm.removeIframe();
      vm.initIframe();
    }, 200),
    initIframe() {
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('crossorigin', 'anonymous');
      this.iframeEl.setAttribute('target', '_parent');
      this.iframeEl.setAttribute(
        'style',
        'visibility: hidden; position: absolute; top: -99999px'
      );

      if (this.className) this.iframeEl.setAttribute('class', this.className);
      this.$el.appendChild(this.iframeEl);

      this.iframeEl.addEventListener('load', () => {
        try {
          (this.iframeEl.contentWindow || this.iframeEl.contentDocument)
            .location.href;
        } catch (err) {
          // this.removeIframe();
          this.showError();
        }
      });

      this.setIframeUrl();
    },
    showError() {
      this.errorLoad = true;
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener
        ? 'addEventListener'
        : 'attachEvent';
      const eventer = window[eventMethod];
      const messageEvent =
        eventMethod === 'attachEvent' ? 'onmessage' : 'message';

      // Listen to message from child window
      eventer(
        messageEvent,
        event => {
          if (event.data === this.iframeLoadedMessage) {
            this.$emit('load');

            this.iframeEl.setAttribute('style', 'visibility: visible;');
          }
        },
        false
      );
    },
  },
  mounted() {
    this.listenForEvents();

    this.initIframe();
  },
};
</script>
