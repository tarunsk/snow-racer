<script>
// import {eventBus} from "../main.js";

export default {
  name: 'Hide',
  props: ['hideURL'],
  methods: {
    handleKeyPress: function(e) {
      if(e.key === 'Escape') {
        console.log("Pressed escape");
        this.$emit('unhide');
      }
    }
  },
  mounted: function() {
    window.addEventListener('keydown', this.handleKeyPress);
  }
}
</script>

<template>
  <iframe
    v-bind:src="hideURL"
    style="
      position: fixed;
      top: 0px;
      bottom: 0px;
      right: 0px;
      width: 100%;
      border: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      z-index: 1;
      height: 100%;
    " />
</template>
