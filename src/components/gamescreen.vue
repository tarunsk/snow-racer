<script>
import Countdown from './countdown.vue'

export default {
  name: 'GameScreen',
  props: ['icon', 'duration'],
  components: {
    Countdown
  },
  methods: {
    gameOver: function() {

    }
  }
}
</script>

<template>
  <div class="d-flex flex-row h-100">
    <div class="opacity-4 game-panel">
      <!-- <div class="game-panel" /> -->
      <div class="opacity-4 game-backdrop" />
    </div>
    <div class="opacity-4 display-panel" style="background-color:white;">
      <Countdown v-bind:duration="duration" v-on:game-over="gameOver" />
    </div>
  </div>
</template>
