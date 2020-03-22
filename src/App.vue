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
    }
  },
  methods: {
    setChosenTrack(value) {
      this.chosenTrack = value;
    },
    setChosenIcon(value) {
      this.chosenIcon = value;
      this.renderGame = true;
      console.log(this.renderGame);
    }
  },
}
</script>

<template>
  <div id="app" class="h-100 bg">
    <Landing v-if="!menuSelect" v-on:play-now="menuSelect=true"/>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && (chosenTrack === null)">
      <Menu v-for="track in Tracks.options" v-bind:key="track.id" v-bind:option="track" v-on:chosen-option="setChosenTrack"/>
    </div>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && !renderGame">
      <Menu v-for="icon in Icons.options" v-bind:key="icon.id" v-bind:option="icon" v-on:chosen-option="setChosenIcon"/>
    </div>
    <div class="h-100" v-if="renderGame === true">
      <div class="racetrack h-100 mx-auto my-auto" v-html="chosenTrack" />
      <div class="avatar h-25" v-html="chosenIcon" />
    </div>
  </div>
</template>

<style>

</style>
