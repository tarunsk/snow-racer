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
    generateObject: function() {
      let newItem = {
        id: this.latestObjId,
        src: require('@/assets/img/bluebook.png'),
        xpos: this.generateRandomVal(10, 85) + '%',
        ypos: 0,
        timer: null,
      }
      newItem.timer = setInterval(function() {
        newItem.ypos = (parseFloat(newItem.ypos) + 1) + '%';
        if (parseFloat(newItem.ypos) > 85) {
          clearInterval(newItem.timer);
          return;
        }
      }, 50);
      this.itemList.push(newItem);
      this.latestObjId++;
    },
    generateRandomVal(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  data: function() {
    return {
      graduation: require('@/assets/img/graduation.png'),
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
    this.objTimer = setInterval(this.generateObject, 500);
  },
  created: function() {
    let _this = this;
    eventBus.$on('game-over', function() {
      _this.gameOver = true;
      clearInterval(_this.objTimer);
    })
  }
}

</script>

<template>
  <div ref="gameBoard" class="container h-100 w-100 game-board">
    <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
    <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos }" />
    <div v-for="item in itemList" v-bind:key="item.id" class="obstacle">
      <img v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="item.id" v-bind:style="{ top: item.ypos, left: item.xpos }">
    </div>
  </div>
</template>
