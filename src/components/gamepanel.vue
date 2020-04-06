<script>
import Countdown from './countdown.vue'
import {eventBus} from "../main.js";

export default {
  name: 'GamePanel',
  props: ['duration', 'bestTime'],
  components: {
    Countdown,
  },
  methods: {
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
    },
    togglePause() {
      this.paused = !this.paused;
      eventBus.$emit('game-pause-toggle');
    },
  },
  data() {
    return {
      numJumps: 0,
      paused: false,
      pause: require('../assets/img/pause.png'),
      play: require('../assets/img/play.png'),
      restart: require('../assets/img/restart.png')
    }
  },
  created() {
    let _this = this;
    eventBus.$on('add-jump', function() {
      _this.numJumps += 1;
    })
    eventBus.$on('subtract-jump', function() {
      _this.numJumps -= 1;
    })
  }
}

</script>

<template>
    <div class="d-flex flex-column justify-content-center text-align-center h-100">
          <Countdown class="my-auto" v-bind:paused="paused" v-bind:duration="duration" v-on:timer="calcScore"/>
          <img class="mx-auto my-auto" v-bind:src="require('@/assets/img/espresso_coffee.png')" style="width:60%; margin-bottom=0;">
          <p class="lead">x {{this.numJumps}}</p>
          <p class="my-auto" v-if="this.$props.bestTime">Best score: <br>{{humanizeTime(this.$props.bestTime)}}</p>
          <div class="row my-auto">
            <div class="col">
              <img v-if="this.paused" :src="this.play" style="width: 60%;" v-on:click="togglePause()">
              <img :src="this.pause" style="width: 60%;" v-on:click="togglePause()" v-else>
            </div>
            <div class="col">
              <img :src="this.restart" style="width: 60%;" v-on:click="$emit('reset', $props.bestTime)">
            </div>
          </div>
          <!-- <a class="btn btn-primary btn-block panel-button my-auto" type="button" v-on:click="$emit('reset', $props.bestTime)">Reset</a> -->
          <a class="btn btn-primary btn-block panel-button my-auto" type="button" v-on:click="$emit('disguise')">Disguise</a>


    </div>
</template>
