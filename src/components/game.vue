<script>
export default {
  name: 'Game',
  props: ['icon'],
  components: {
  },
  methods: {
    handleKeyPress: function (e) {
      const upArrow = 38;
      const downArrow = 40;
      const leftArrow = 37;
      const rightArrow = 39;
      const keyCode = e.keyCode;
      if (keyCode === upArrow) {
        console.log("moving forward");
        this.racerYpos += 10;
      }
      if (keyCode === downArrow) {
        console.log("moving backward");
        this.racerYpos -= 10;
      }
      if (keyCode === rightArrow) {
        console.log("turning right");
        this.racerXpos += 10;
      }
      if (keyCode === leftArrow) {
        console.log("turning left");
        this.racerXpos -= 10;
      }
    }
  },
  data: function() {
    return {
      graduation: require('@/assets/img/graduation.png'),
      racerXpos: null,
      racerYpos: null,
    }
  },
  mounted: function () {
    // add an event listener for keypress
    console.log(this.$refs.gameBoard.clientWidth);
    window.addEventListener('keydown', this.handleKeyPress);
    this.racerXpos = this.$refs.gameBoard.clientWidth/2;
    this.racerYpos = "0%";
  }
}
</script>

<template>
  <div ref="gameBoard" class="container h-100 w-100 game-board">
    <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
    <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos + 'px' }" />
  </div>
</template>
