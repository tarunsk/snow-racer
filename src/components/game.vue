<script>
import {eventBus} from "../main.js";
import Player from "./player.vue"
import Item from "./items.vue"

export default {
  name: 'Game',
  props: ['icon'],
  components: {
    Player,
    Item
  },
  methods: {
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
    removeObject: function() {
      this.itemList.shift();
      console.log(this.itemList.length);
    },
    generateRandomVal(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    onGroupOneCollide (collider) {
      console.log("group one collision");
      this.removeObject();
      collider.$destroy();
    }
  },
  data: function() {
    return {
      graduation: require('@/assets/img/graduation.png'),
      availableJumps: 0,
      gameOver: false,
      itemList: [],
      latestObjId: 0,
      objTimer: null,
    }
  },
  mounted: function () {
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
    <div class="player">
      <Player v-collision="['groupOne']" @collide-groupOne="this.onGroupOneCollide" v-bind:icon="icon"/>
    </div>
    <div v-for="item in itemList" v-bind:key="item.id" class="obstacle">
      <Item v-collision="['groupOne']" v-bind:src="item.src" v-bind:id="item.id" v-bind:ref="item.id" v-bind:style="{ top: item.ypos, left: item.xpos }"/>
    </div>
  </div>
</template>
