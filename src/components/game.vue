<script>
import {eventBus} from "../main.js";

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

export default {
  name: 'Game',
  props: ['icon'],
  components: {
  },
  methods: {
    generateNegObject: function() {
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
      this.negItemList.push(newItem);
      this.latestObjId++;
    },
    generatePosObject: function() {
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
      this.posItemList.push(newItem);
      this.latestObjId++;
    },
    handleKeyPress: function (e) {
      if(!this.gameOver) {
        const keyCode = e.keyCode;
        this.moveAvatar(keyCode);
      }
    },
    moveAvatar: function(direction) {
      if (direction === UP) {
        console.log("moving forward");
        this.racerYpos = (parseFloat(this.racerYpos) + this.racerSpeed) + '%';
      }
      else if (direction === DOWN) {
        console.log("moving backward");
        this.racerYpos = (parseFloat(this.racerYpos) - this.racerSpeed) + '%';
      }
      else if (direction === RIGHT) {
        console.log("turning right");
        this.racerXpos = (parseFloat(this.racerXpos) + this.racerSpeed) + '%';
      }
      else if (direction === LEFT) {
        console.log("turning left");
        this.racerXpos = (parseFloat(this.racerXpos) - this.racerSpeed) + '%';
      }
    },
    generateRandomVal(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    itemCollision: function() {
      // Check item collisions
      for (let i=0; i < this.negItemList.length; i++) {
        // Player collides with negative item (racerYpos subtracted from 100 to get top pos)
        if (Math.abs(parseInt(this.negItemList[i].xpos) - parseInt(this.racerXpos)) < 4 &&
            Math.abs(parseInt(this.negItemList[i].ypos) - (100 - parseInt(this.racerYpos))) < 10) {
          this.negItemList.splice(i, 1);
        }
        // Negative item reaches bottom of screen
        if (parseInt(this.negItemList[i].ypos) > 85) {
          this.negItemList.splice(i, 1);
        }
      }
      // Check if player collides with graduation - player wins
      if (parseInt(this.racerXpos) < 4 && parseInt(this.racerYpos) > 80) {
        console.log("player wins!");
        this.gameOver = true;
        this.gameWin = true;
        clearInterval(this.objTimer);
        eventBus.$emit('game-win');
      }
    },
    swipeHandler: function(direction) {
      if(!this.gameOver) {
        switch (direction) {
          case "top":
            this.moveAvatar(UP);
            break;
          case "bottom":
            this.moveAvatar(DOWN);
            break;
          case "left":
            this.moveAvatar(LEFT);
            break;
          case "right":
            this.moveAvatar(RIGHT);
            break;
          default:
            break;
        }
      }
    }
  },
  data: function() {
    return {
      graduation: require('@/assets/img/graduation.png'),
      gradXpos: null,
      gradYpos: null,
      racerXpos: null,
      racerYpos: null,
      racerSpeed: 1,
      availableJumps: 0,
      gameOver: false,
      gameWin: false,
      negItemList: [],
      posItemList: [],
      latestObjId: 0,
      objTimer: null,
    }
  },
  mounted: function () {
    // add an event listener for keypress
    window.addEventListener('keydown', this.handleKeyPress);
    this.racerXpos = "40%";
    this.racerYpos = "5%";
    this.objTimer = setInterval(this.generateNegObject, 500);
    setInterval(this.itemCollision, 40);
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
  <div ref="gameBoard" class="container h-100 w-100 game-board" v-touch:swipe="this.swipeHandler">
    <div ref="playGame" v-if="!gameWin">
      <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
      <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos }" />
      <div v-for="item in negItemList" v-bind:key="item.id" class="obstacle">
        <img v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="item.id" v-bind:style="{ top: item.ypos, left: item.xpos }"/>
      </div>
    </div>

    <div ref="winScreen" v-if="gameWin">
      <h1> Diploma pic will go here lol </h1>
    </div>
  </div>
</template>
