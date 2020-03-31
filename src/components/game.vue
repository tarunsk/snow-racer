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
        if (direction === UP && ((parseFloat(this.racerYpos) + this.racerSpeed) <= 90) && this.availableJumps > 0) {
          console.log("moving forward");
          this.racerYpos = (parseFloat(this.racerYpos) + this.racerSpeed) + '%';
          this.availableJumps -= 1
        }
      }
      else if (direction === DOWN && ((parseFloat(this.racerYpos) + this.racerSpeed) >= 5)) {
        console.log("moving backward");
        this.racerYpos = (parseFloat(this.racerYpos) - this.racerSpeed) + '%';
      }
      if (direction === RIGHT && ((parseFloat(this.racerXpos) + this.racerSpeed) <= 90)) {
        console.log("turning right");
        this.racerXpos = (parseFloat(this.racerXpos) + this.racerSpeed) + '%';
      }
      else if (direction === LEFT && ((parseFloat(this.racerXpos) + this.racerSpeed) >= 5)) {
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
      // Check if player collides with negative item
      let i = this.negItemList.length -1;
      while (i >= 0) {
        if (parseFloat(this.negItemList[i].ypos) > 85) {
          this.negItemList.splice(i, 1);
        }
        if (this.isOrWillCollide(this.$refs.avatar, this.$refs["neg"+this.negItemList[i].id][0], 0, 0)) {
          this.negItemList.splice(i, 1);
        }
        i--;
      }

      // Check if player collides with positive item
      let j = this.posItemList.length -1;
      while (j >= 0) {
        if (parseFloat(this.posItemList[j].ypos) > 85) {
          this.posItemList.splice(j, 1);
        }
        if (this.isOrWillCollide(this.$refs.avatar, this.$refs["pos"+this.posItemList[j].id][0], 0, 0)) {
          this.posItemList.splice(j, 1);
          this.collectPosItem();
        }
        j--;
      }

      // Check if player collides with graduation - player wins
      if (this.isOrWillCollide(this.$refs.avatar, this.$refs.graduation, 0, 0)) {
        console.log("player wins!");
        this.gameOver = true;
        this.gameWin = true;
        clearInterval(this.objTimer);
        clearInterval(this.collisionTimer);
        eventBus.$emit('game-win');
      }
    },
    collectPosItem: function() {
      this.availableJumps += 1;
      // emit collected signal to add to game panel
     },
    isOrWillCollide: function (o1, o2, o1_xChange, o1_yChange) {
      const o1D = { 'left': o1.getBoundingClientRect().left + o1_xChange,
            'right': o1.getBoundingClientRect().left + o1.clientWidth + o1_xChange,
            'top': o1.getBoundingClientRect().top + o1_yChange,
            'bottom': o1.getBoundingClientRect().top + o1.clientHeight + o1_yChange
      };
      const o2D = { 'left': o2.getBoundingClientRect().left,
            'right': o2.getBoundingClientRect().left + o2.clientWidth,
            'top': o2.getBoundingClientRect().top,
            'bottom': o2.getBoundingClientRect().top + o2.clientHeight
      };
      // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
      if (o1D.left < o2D.right &&
        o1D.right > o2D.left &&
        o1D.top < o2D.bottom &&
        o1D.bottom > o2D.top) {
         // collision detected!
         console.log("Collision!");
         return true;
      }
      return false;
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
    this.objTimer = setInterval(this.generateNegObject, 1000);
    this.objTimer = setInterval(this.generatePosObject, 1000);
    this.collisionTimer = setInterval(this.itemCollision, 100);
  },
  created: function() {
    let _this = this;
    eventBus.$on('game-over', function() {
      _this.gameOver = true;
      clearInterval(_this.objTimer);
      clearInterval(_this.collisionTimer);
    })
    eventBus.$on('game-pause', function() {
      clearInterval(_this.objTimer);
      clearInterval(_this.collisionTimer);
    })
  }
}

</script>

<template>
  <div id="gameBoard" ref="gameBoard" class="container h-100 w-100 game-board" v-touch:swipe="this.swipeHandler">
    <div ref="playGame" v-if="!gameWin">
      <img ref="graduation" class="graduation" v-bind:src="this.graduation" />
      <img v-bind:src="icon" ref="avatar" class="avatar" v-bind:style="{ bottom: this.racerYpos, left: this.racerXpos, height: this.racerHeight, width: this.racerWidth }" />
      <img v-for="item in negItemList" v-bind:key="item.id" class="obstacle" v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="'neg'+item.id" v-bind:style="{ top: item.ypos, left: item.xpos }"/>
      <img v-for="item in posItemList" v-bind:key="item.id" class="powerup" v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="'pos'+item.id" v-bind:style="{ top: item.ypos, left: item.xpos }">
    </div>

    <div ref="winScreen" class="col d-flex align-items-center justify-content-center" v-if="gameWin">
      <img id="diploma" class="w-75" v-bind:src="require('@/assets/img/diploma.png')" />
    </div>
  </div>
</template>
