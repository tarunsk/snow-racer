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
    <div class="container">
      <div class="row h-25">
        <div class="col">
          <Countdown v-bind:paused="paused" v-bind:duration="duration" v-on:timer="calcScore"/>
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <!-- TODO: change width to percentage or something?? -->
          <img v-bind:src="require('@/assets/img/espresso_coffee.png')" style="width:60px">
          x {{this.numJumps}}
          <!-- <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('disguise')">Disguise</a> -->
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <p v-if="this.$props.bestTime">Best score: <br>{{humanizeTime(this.$props.bestTime)}}</p>
        </div>
      </div>
      <div class="row h-25">
        <div v-if="this.paused" class="col">
          <a class="btn btn-primary btn-block" type="button" v-on:click="togglePause()">Resume</a>
        </div>
        <div v-else class="col">
          <a class="btn btn-primary btn-block" type="button" v-on:click="togglePause()">Pause</a>
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <a class="btn btn-primary btn-block" type="button" v-on:click="$emit('reset', $props.bestTime)">Reset</a>
          <!-- <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('disguise')">Disguise</a> -->
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <a class="btn btn-primary btn-block" type="button" v-on:click="$emit('disguise')">Disguise</a>
        </div>
      </div>


    </div>
</template>
