<script>
import Landing from './components/landing.vue'
import Menu from './components/menu.vue'
import GameScreen from './components/gamescreen.vue'
// import Durations from './assets/durations.json'
// import Icons from './assets/icons.json'

export default {
  name: 'App',
  components: {
    Landing,
    Menu,
    GameScreen
  },
  data: function() {
    return {
      durations: [
        {
          id: 0,
          name: "0:30",
          value: "0:30",
          img: false
        },
        {
          id: 1,
          name: "1:00",
          value: "1:00",
          img: false
        },
        {
          id: 2,
          name: "5:00",
          value: "5:00",
          img: false
        }
      ],
      icons: [
        {
          "id": 1,
          "name": "Toboggan",
          "value": require("@/assets/img/toboggan.png"),
          "img": true
        },
        {
          "id": 2,
          "name": "Spin",
          "value": require("@/assets/img/spin.png"),
          "img": "true"
        }
      ],
      menuSelect: false,
      renderGame: false,
      chosenDuration: null,
      chosenIcon: null,
      racerXpos: 0,
      racerYpos: 0,
    }
  },
  methods: {
    setDuration(value) {
      this.chosenDuration = value;
    },
    setChosenIcon(value) {
      this.chosenIcon = value;
      this.renderGame = true;
    },
  },
  mounted: function () {
    // add an event listener for keypress
      window.addEventListener('keydown', this.handleKeyPress)
  }
}
</script>

<template>
  <div ref="app" id="app" class="h-100 bg">
    <Landing class="h-100" v-if="!menuSelect" v-on:play-now="menuSelect=true"/>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && (chosenDuration === null)">
      <Menu v-for="duration in durations" v-bind:key="duration.id" v-bind:option="duration" v-on:chosen-option="setDuration"/>
    </div>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && !renderGame && chosenDuration !== null">
      <Menu v-for="icon in icons" v-bind:key="icon.id" v-bind:option="icon" v-on:chosen-option="setChosenIcon"/>
    </div>
    <GameScreen v-if="renderGame" v-bind:duration="chosenDuration" v-bind:icon="chosenIcon"/>
  </div>
</template>

<style>

</style>
