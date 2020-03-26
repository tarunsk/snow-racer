<script>

export default {
  name: 'Player',
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
      racerXpos: null,
      racerYpos: null,
      availableJumps: 0,
      gameOver: false,
      itemList: [],
      latestObjId: 0,
      objTimer: null,
    }
  },
  mounted: function () {
    // add an event listener for keypress
    window.addEventListener('keydown', this.handleKeyPress);
    this.racerXpos = "40%";
    this.racerYpos = "5%";
  }
}

</script>

<template>
    <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos }" />
</template>
