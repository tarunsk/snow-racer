<script>
import {eventBus} from "../main.js";

export default {
  name: 'Game',
  props: ['icon'],
  components: {
  },
  methods: {
    handleKeyPress: function (e) {
      if(!this.gameOver) {
        const leftArrow = 37;
        const rightArrow = 39;
        const keyCode = e.keyCode;
        if (keyCode === rightArrow) {
          console.log("turning right");
          this.racerXpos = (parseFloat(this.racerXpos) + 0.5) + '%';
        }
        if (keyCode === leftArrow) {
          console.log("turning left");
          this.racerXpos = (parseFloat(this.racerXpos) - 0.5) + '%';
        }
      }
    },

  },
  data: function() {
    return {
      graduation: require('@/assets/img/graduation.png'),
      racerXpos: null,
      racerYpos: null,
      availableJumps: 0,
      gameOver: false,
    }
  },
  mounted: function () {
    // add an event listener for keypress
    window.addEventListener('keydown', this.handleKeyPress);
    this.racerXpos = "40%";
    this.racerYpos = "5%";
  },
  created: function() {
    let _this = this;
    eventBus.$on('game-over', function() {
      _this.gameOver = true;
    })
  }
}

</script>

<template>
  <div ref="gameBoard" class="container h-100 w-100 game-board">
    <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
    <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos }" />
  </div>
</template>
