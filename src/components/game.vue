parseFloat<script>
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
      console.log('generating neg obj')
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
      console.log('generating pos obj')
      let pic = this.generateRandomVal(0,3)
      let newItem = {}
      if (parseInt(pic) == 0) {
        newItem = {
          id: this.latestObjId,
          src: require('@/assets/img/espresso_coffee.png'),
          xpos: this.generateRandomVal(10, 85) + '%',
          ypos: 0,
          timer: null
        }
      }
      if (parseInt(pic) == 1) {
        newItem = {
          id: this.latestObjId,
          src: require('@/assets/img/sw_coffee.png'),
          xpos: this.generateRandomVal(10, 85) + '%',
          ypos: 0,
          timer: null
        }
      }
      if (parseInt(pic) == 2) {
        newItem = {
          id: this.latestObjId,
          src: require('@/assets/img/sb_coffee.png'),
          xpos: this.generateRandomVal(10, 85) + '%',
          ypos: 0,
          timer: null
        }
      }

      newItem.timer = setInterval(function() {
        newItem.ypos = (parseFloat(newItem.ypos) + 1) + '%';
        if (parseFloat(newItem.ypos) > 85) {
          clearInterval(newItem.timer);
          return;
        }
      }, 50);

      console.log(newItem)
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
        if (this.availableJumps > 0) {
          console.log("moving forward");
          this.racerYpos = (parseFloat(this.racerYpos) + this.racerSpeed) + '%';
          this.availableJumps -= 1
        }
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
      let avatarHeight = parseFloat(this.$refs.avatar.clientHeight);
      let avatarWidth = parseFloat(this.$refs.avatar.clientWidth);
      let gameWindowWidth = parseFloat(this.$refs.gameBoard.clientWidth);
      let gameWindowHeight = parseFloat(this.$refs.gameBoard.clientHeight);
      let avatarHeightPercent = (avatarHeight / gameWindowHeight) * 100;
      let avatarWidthPercent = (avatarWidth / gameWindowWidth) * 100;

      // Check negative item collisions
      for (let i=0; i < this.negItemList.length; i++) {
        // Player collides with negative item (racerYpos subtracted from 100 to get top pos)
        if (
            (parseFloat(this.negItemList[i].xpos) > (parseFloat(this.racerXpos) - 4)) &&
            (parseFloat(this.negItemList[i].xpos) < (parseFloat(this.racerXpos) + avatarWidthPercent + 4)) &&
            (parseFloat(this.negItemList[i].ypos) > (100 - parseFloat(this.racerYpos) - avatarHeightPercent - 4)) &&
            (parseFloat(this.negItemList[i].ypos) < (100 - parseFloat(this.racerYpos) + 4))
          ) {
          this.negItemList.splice(i, 1);
        }
        // Negative item reaches bottom of screen
        if (parseFloat(this.negItemList[i].ypos) > 85) {
          this.negItemList.splice(i, 1);
        }
      }

      // Check positive item collisions
      for (let i=0; i < this.posItemList.length; i++) {
        // Player collides with positive item (racerYpos subtracted from 100 to get top pos)
        if (
            (parseFloat(this.posItemList[i].xpos) > (parseFloat(this.racerXpos) - 4)) &&
            (parseFloat(this.posItemList[i].xpos) < (parseFloat(this.racerXpos) + avatarWidthPercent + 4)) &&
            (parseFloat(this.posItemList[i].ypos) > (100 - parseFloat(this.racerYpos) - avatarHeightPercent - 4)) &&
            (parseFloat(this.posItemList[i].ypos) < (100 - parseFloat(this.racerYpos) + 4))
          ) {
          this.posItemList.splice(i, 1);
          this.collectPosItem();
        }
        // Positive item reaches bottom of screen
        if (parseFloat(this.posItemList[i].ypos) > 85) {
          this.posItemList.splice(i, 1);
        }
      }

      // Check if player collides with graduation - player wins
      if (parseFloat(this.racerXpos) < 4 && parseFloat(this.racerYpos) > 80) {
        console.log("player wins!");
        this.gameOver = true;
        this.gameWin = true;
        clearInterval(this.objTimer);
        eventBus.$emit('game-win');
      }
    },
    collectPosItem: function() {
      this.availableJumps += 1;
      // emit collected signal to add to game panel
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
      racerHeight: null,
      racerWidth: null,
      racerSpeed: 1,
      availableJumps: 0,
      gameOver: false,
      gameWin: false,
      negItemList: [],
      posItemList: [],
      latestObjId: 0,
      objTimer: null,
      collisionTimer: null
    }
  },
  mounted: function () {
    // add an event listener for keypress
    window.addEventListener('keydown', this.handleKeyPress);
    this.racerXpos = "40%";
    this.racerYpos = "5%";
    this.racerHeight = "7%";
    this.racerWidth = "10%";
    this.objTimer = setInterval(this.generateNegObject, 500);
    this.objTimer = setInterval(this.generatePosObject, 500);
    this.collisionTimer = setInterval(this.itemCollision, 40);
  },
  created: function() {
    let _this = this;
    eventBus.$on('game-over', function() {
      _this.gameOver = true;
      clearInterval(_this.objTimer);
    })
    eventBus.$on('game-pause', function() {
      clearInterval(_this.objTimer);
      clearInterval(_this.collisionTimer);
    })
  }
}

</script>

<template>
  <div ref="gameBoard" class="container h-100 w-100 game-board" v-touch:swipe="this.swipeHandler">
    <div ref="playGame" v-if="!gameWin">
      <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
      <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos, height: this.racerHeight, width: this.racerWidth }" />
      <div v-for="item in negItemList" v-bind:key="item.id" class="obstacle">
        <img v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="item.id" v-bind:style="{ top: item.ypos, left: item.xpos }"/>
      </div>
      <div v-for="item in posItemList" v-bind:key="item.id" class="powerup">
        <img v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="item.id" v-bind:style="{ top: item.ypos, left: item.xpos }"/>
      </div>
    </div>

    <div ref="winScreen" class="col d-flex align-items-center justify-content-center" v-if="gameWin">
      <img id="diploma" class="w-75" v-bind:src="require('@/assets/img/diploma.png')" />
    </div>
  </div>
</template>
