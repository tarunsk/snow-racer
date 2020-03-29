<script>
import Countdown from './countdown.vue'
import Game from './game.vue'

export default {
  name: 'GameScreen',
  props: ['icon', 'duration', 'bestTime'],
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
      if (this.$props.bestTime === undefined || time_taken < this.$props.bestTime) {
        this.$props.bestTime = time_taken;
      }
      this.best_time = this.$props.bestTime;
    },
    humanizeTime(seconds) {
      // From seconds to human readable time
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      let time_str = minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
      console.log(time_str);
      return time_str;
    }
  },
  data() {
    return {
      best_time: null,
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
      <p v-if="this.$props.bestTime">Best score: <br>{{humanizeTime(this.$props.bestTime)}}</p>
      <a class="btn btn-primary btn-sml" type="button" v-on:click="$emit('reset', $props.bestTime)">Reset</a>
    </div>
  </div>
</template>
