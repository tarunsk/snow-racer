<script>
import Menu from "./menu.vue";
export default {
  name: "itemMenu",
  components: {
    Menu
  },
  methods: {
    setChosenIcon(value) {
     this.$emit('icon', value);
    }
  },
  data: function() {
    return {
      icons: [
        {
          id: 1,
          name: "Toboggan",
          value: require("../assets/img/toboggan.png"),
          img: true
        },
        {
          id: 2,
          name: "Spin",
          value: require("../assets/img/spin.png"),
          img: "true"
        },
        {
          id: 3,
          name: "Blue Bus",
          value: require("../assets/img/bluebus.png"),
          img: "true"
        }
      ]
    };
  }
};
</script>

<template>
  <div>
    <div class="row h-100 w-100 mx-auto my-auto justify-content-center" style="margin:0;" >
      <Menu v-for="icon in icons" v-bind:key="icon.id" v-bind:option="icon" v-on:chosen-option="setChosenIcon"/>
    </div>
  </div>
</template>