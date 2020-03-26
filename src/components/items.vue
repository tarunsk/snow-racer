<script>

export default {
  name: 'Item',
  components: {
  },
  methods: {
  },
  data: function() {
    return {
      src: null,
      id: null,
      ref: null,
      itemList: [],
      latestObjId: 0,
      objTimer: null,
    }
  },
  mounted: function () {
  }
}

</script>

<template>
  <img v-bind:src="src" v-bind:id="id" v-bind:ref="id">
</template>
