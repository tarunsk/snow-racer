<script>
import GamePanel from './gamepanel.vue'
import Game from './game.vue'
import Hide from './hide.vue'

import {eventBus} from "../main.js";

export default {
  name: 'GameScreen',
  props: ['icon', 'duration'],
  components: {
    Hide,
    GamePanel,
    Game
  },
  methods: {
    gameOver: function() {

    },
    gameWin: function() {

    },
    setDisguise: function(val) {
      if(val === true) {
        eventBus.$emit('game-pause');
        this.chosenURL = (this.chosenURL + 1) % this.hideURL.length;
      }
      console.log("Here");
      this.disguise = val;
    }
  },
  data: function() {
    return {
      disguise: false,
      hideURL: ["https://lobster.eecs.umich.edu/eecsoh/", "https://www.annarbor.org/"],
      chosenURL: 0,
    }
  }
}
</script>

<template>
  <div v-if="!disguise" class="d-flex flex-row h-100">
    <div class="game-panel">
      <div class="opacity-4 game-backdrop" />
      <Game v-bind:icon="icon" v-on:game-win="gameWin"/>
    </div>
    <div class="opacity-4 display-panel" style="background-color:white;">
      <GamePanel v-bind:duration="duration" v-on:game-over="gameOver" v-on:disguise="setDisguise(true)" />
    </div>
  </div>
  <Hide v-else v-on:unhide="setDisguise(false)" v-bind:hideURL="hideURL[this.chosenURL]" />
</template>
