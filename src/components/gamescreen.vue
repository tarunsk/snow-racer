<script>
import Countdown from './countdown.vue'
import Game from './game.vue'

export default {
  name: 'GameScreen',
  props: ['icon', 'duration'],
  components: {
    Countdown,
    Game
  },
  methods: {
    gameOver: function() {

    }
  }
}
</script>

<template>
  <div class="d-flex flex-row h-100">
    <div class="game-panel">
      <div class="opacity-4 game-backdrop" />
      <Game v-bind:icon="icon" />
    </div>
    <div class="opacity-4 display-panel" style="background-color:white;">
      <Countdown v-bind:duration="duration" v-on:game-over="gameOver" />
    </div>
  </div>
</template>
