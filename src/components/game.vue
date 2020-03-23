<script>
export default {
  name: 'Game',
  props: ['icon'],
  components: {
  },
  methods: {
    handleKeyPress: function (e) {
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
    },

  },
  data: function() {
    return {
      graduation: require('@/assets/img/graduation.png'),
      racerXpos: null,
      racerYpos: null,
      availableJumps: 0,
    }
  },
  mounted: function () {
    // add an event listener for keypress
    window.addEventListener('keydown', this.handleKeyPress);
    this.racerXpos = "40%";
    this.racerYpos = "5%";
  },
}
</script>

<template>
  <div ref="gameBoard" class="container h-100 w-100 game-board">
    <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
    <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos }" />
  </div>
</template>
