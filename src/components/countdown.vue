<script>
import {eventBus} from "../main.js";

export default {
  name: 'Countdown',
  props: ['duration'],
  data: function() {
      return {
        timeLeft: '0:00',
        secondsLeft: 0,
        timer: null,
        gameWin: false,
      }
  },
  methods: {
    startTimer: function() {
      let _this = this;
      this.timer = setInterval(function() {
        _this.secondsLeft -= 1;
        if (_this.secondsLeft < 0) {
          clearInterval(_this.timer);
          eventBus.$emit('game-over');
          return;
        }
        _this.updateTimer();
      }, 1000)
    },
    updateTimer: function() {
      let minutes = Math.floor(this.secondsLeft / 60);
      let seconds = this.secondsLeft % 60;
      this.timeLeft = minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }
  },
  mounted: function() {
    let timeSplit = this.$props.duration.split(":");
    // console.log(timeSplit);
    this.secondsLeft = parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1]);
    console.log(this.secondsLeft);
    this.startTimer();
  },
  created: function() {
    let _this = this;
    eventBus.$on('game-win', function() {
      _this.gameWin = true;
      clearInterval(_this.timer);
      _this.timeLeft = "Congratulations!"
    })
  }
}
</script>

<template>
  <h1>{{timeLeft}}</h1>
</template>
