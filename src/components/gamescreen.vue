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

    },
    gameWin: function() {

    },
    calcScore(seconds_left) {
    let timeSplit = this.$props.duration.split(":");
    let total_time = parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1]);
    let time_taken = total_time - seconds_left;
    console.log(time_taken + 's');
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row h-100">
    <div class="game-panel">
      <div class="opacity-4 game-backdrop" />
      <Game v-bind:icon="icon" v-on:game-win="gameWin"/>
    </div>
    <div class="opacity-4 display-panel" style="background-color:white;">
      <Countdown v-bind:duration="duration" v-on:game-over="gameOver" v-on:timer="calcScore"/>
    </div>
  </div>
</template>
