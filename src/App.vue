<script>
import Landing from './components/landing.vue'
import Menu from './components/menu.vue'
import GameScreen from './components/gamescreen.vue'

export default {
  name: 'App',
  components: {
    Landing,
    Menu,
    GameScreen
  },
  data: function() {
    return {
      durations: [
        {
          id: 0,
          name: "0:30",
          value: "0:30",
          img: false,
        },
        {
          id: 1,
          name: "1:00",
          value: "1:00",
          img: false,
        },
        {
          id: 2,
          name: "5:00",
          value: "5:00",
          img: false,
        }
      ],
      icons: [
        {
          "id": 1,
          "name": "Toboggan",
          "value": require("@/assets/img/toboggan.png"),
          "img": true
        },
        {
          "id": 2,
          "name": "Spin",
          "value": require("@/assets/img/spin.png"),
          "img": "true"
        },
        {
          "id": 3,
          "name": "Blue Bus",
          "value": require("@/assets/img/bluebus.png"),
          "img": "true"
        }
      ],
      menuSelect: false,
      renderGame: false,
      chosenDuration: null,
      chosenIcon: null,
      racerXpos: 0,
      racerYpos: 0,
      highScore: undefined,
    }
  },
  computed:{
    originX(){
        return this.x - this.width/2
    },
    originY(){
        return this.y - this.height/2
    },
    transform(){
        return `rotate(${this.angle} ${this.x} ${this.y})`
    },
    isMobile: function() {
      if( screen.width <= 760 ) {
          return "col-12 my-auto mx-auto track-select";
      }
      else {
          return "row h-100 w-100 my-auto mx-auto track-select";
      }
    }
  },
  methods: {
    setDuration(value) {
      this.chosenDuration = value;
    },
    setChosenIcon(value) {
      this.chosenIcon = value;
      this.renderGame = true;
    },
    resetGame(newHighScore) {
      this.menuSelect = true;
      this.renderGame = false;
      this.chosenDuration = null;
      this.chosenIcon = null;
      this.racerXpos = 0;
      this.racerYpos = 0;
      console.log("here")
      console.log(newHighScore);
      this.highScore = newHighScore;
    }
  },
  mounted: function () {
    // add an event listener for keypress
      window.addEventListener('keydown', this.handleKeyPress)
  }
}
</script>

<template>
  <div ref="app" id="app" class="h-100 bg">
    <Landing class="h-100" v-if="!menuSelect" v-on:play-now="menuSelect=true"/>
    <div class="container h-100 w-100" style="padding: 0;" v-if="menuSelect && (chosenDuration === null)">
      <div class="row h-100 w-100 mx-auto my-auto justify-content-center" style="margin:0;">
        <Menu v-for="duration in durations" v-bind:key="duration.id" v-bind:option="duration" v-on:chosen-option="setDuration"/>
      </div>
    </div>
    <div class="container h-100 w-100 my-auto" style="padding: 0;" v-if="menuSelect && !renderGame && chosenDuration !== null">
      <div class="row h-100 w-100 mx-auto my-auto justify-content-center" style="margin:0;" >
        <Menu v-for="icon in icons" v-bind:key="icon.id" v-bind:option="icon" v-on:chosen-option="setChosenIcon"/>
      </div>
    </div>
    <GameScreen v-if="renderGame" v-bind:bestTime="highScore" v-bind:duration="chosenDuration" v-bind:icon="chosenIcon" v-on:reset="resetGame"/>
  </div>
</template>

<style>

</style>
