<script>
import Landing from './components/landing.vue'
import Menu from './components/menu.vue'
import Tracks from './assets/tracks.json'
import Icons from './assets/icons.json'

export default {
  name: 'App',
  components: {
    Landing,
    Menu
  },
  data: function() {
    return {
      Tracks,
      Icons,
      menuSelect: false,
      renderGame: false,
      chosenTrack: null,
      chosenIcon: null,
      racerXpos: 0,
      racerYpos: 0,
    }
  },
  methods: {
    setChosenTrack(value) {
      this.chosenTrack = value;
    },
    setChosenIcon(value) {
      this.chosenIcon = value;
      this.renderGame = true;
    },
    handleKeyPress: function (e) {
      const upArrow = 38;
      const downArrow = 40;
      const leftArrow = 37;
      const rightArrow = 39;
      const keyCode = e.keyCode;
      if (keyCode === upArrow) {
        console.log("moving forward");
        this.racerXpos += 10;
      }
      if (keyCode === downArrow) {
        console.log("moving backward");
        this.racerXpos -= 10;
      }
      if (keyCode === rightArrow) {
        console.log("turning right");
        this.racerYpos += 10;
      }
      if (keyCode === leftArrow) {
        console.log("turning left");
        this.racerYpos -= 10;
      }
    }
  },
  mounted: function () {
    // add an event listener for keypress
      window.addEventListener('keydown', this.handleKeyPress)
  }
}
</script>

<template>
  <div ref="app" id="app" class="h-100 bg">
    <Landing ref='landing' v-if="!menuSelect" v-on:play-now="menuSelect=true"/>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && (chosenTrack === null)">
      <Menu v-for="track in Tracks.options" v-bind:key="track.id" v-bind:option="track" v-on:chosen-option="setChosenTrack"/>
    </div>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && !renderGame">
      <Menu v-for="icon in Icons.options" v-bind:key="icon.id" v-bind:option="icon" v-on:chosen-option="setChosenIcon"/>
    </div>
    <div class="h-100" v-if="renderGame === true">
      <div class="racetrack h-100 w-100 mx-auto my-auto" v-html="chosenTrack " />
      <div class="avatar" v-bind:style="{ top: this.racerYpos + 'px', left: this.racerXpos + 'px'}" v-html="chosenIcon" />
    </div>
  </div>
</template>

<style>

</style>
