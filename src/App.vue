<script>
import Landing from './components/landing.vue'
import Menu from './components/menu.vue'
import Tracks from './assets/tracks.json'
import Icons from './assets/icons.json'
import TWEEN from '@tweenjs/tween.js';

export default {
  name: 'App',
  components: {
    Landing,
    Menu
  },
  data: function() {
    return {
      Tracks,
      Icons,
      menuSelect: false,
      renderGame: false,
      chosenTrack: null,
      chosenIcon: null,
      racerXpos: 0,
      racerYpos: 0,
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
    }
  },
  methods: {
    setChosenTrack(value) {
      this.chosenTrack = value;
    },
    setChosenIcon(value) {
      this.chosenIcon = value;
      this.renderGame = true;
    },
    handleKeyPress: function (e) {
      const upArrow = 38;
      const downArrow = 40;
      const leftArrow = 37;
      const rightArrow = 39;
      const keyCode = e.keyCode;
      if (keyCode === upArrow) {
        console.log("moving forward");
        this.racerXpos += 10;
      }
      if (keyCode === downArrow) {
        console.log("moving backward");
        this.racerXpos -= 10;
      }
      if (keyCode === rightArrow) {
        console.log("turning right");
        this.racerYpos += 10;
      }
      if (keyCode === leftArrow) {
        console.log("turning left");
        this.racerYpos -= 10;
      }
    },
    // Starts speeding tween
    start(dir,type){
        this[type].pressed[dir] = true
        this[type].dir = dir
        if (this[type].tween) this[type].tween.stop()
        this[type].tween = new TWEEN.Tween(this[type])
            .to({speed: dir},400)
            .easing(TWEEN.Easing.Quadratic.In)
            .start()
    },
    // Slow the speed down to 0
    stop(dir,type){
      this[type].pressed[dir] = false
      // Only stop if dir is the current dir
      if (this[type].dir == dir){
          // Check if there is previous dir active
          if (this[type].pressed[dir*-1]){
              this.start(dir*-1,type)
          }else{
              this[type].tween.stop()
              this[type].tween = new TWEEN.Tween(this[type])
                  .to({speed: 0},200)
                  .easing(TWEEN.Easing.Quadratic.Out)
                  .start()
          }
      }
    }
  },
  created(){
    let pressed = {}
    window.addEventListener('keydown',e=>{
        // Block successive events of the same key
        if (pressed[e.keyCode]) return
        else pressed[e.keyCode] = 1
        if (e.keyCode == 37) this.start(-1,'turn')       // Left
        else if (e.keyCode == 39) this.start(1,'turn')   // Right
        else if (e.keyCode == 38) this.start(1,'move')   // Up
        else if (e.keyCode == 40) this.start(-1,'move')  // Down
    })
    window.addEventListener('keyup',e=>{
        delete pressed[e.keyCode]
        if (e.keyCode == 37) this.stop(-1,'turn')
        else if (e.keyCode == 39) this.stop(1,'turn')
        else if (e.keyCode == 38) this.stop(1,'move')
        else if (e.keyCode == 40) this.stop(-1,'move')
    })
    this.turn = {
        speed: 0,
        dir:0,
        pressed:{'-1':false,'1':false},
        tween: null
    }
    this.move = {
        speed: 0,
        dir:0,
        pressed:{'-1':false,'1':false},
        tween: null
    }
    this.lastFrame = Date.now()
    this.render()
  },
  mounted: function () {
    // add an event listener for keypress
      window.addEventListener('keydown', this.handleKeyPress)
  }
}
</script>

<template>
  <div ref="app" id="app" class="h-100 bg">
    <Landing ref='landing' v-if="!menuSelect" v-on:play-now="menuSelect=true"/>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && (chosenTrack === null)">
      <Menu v-for="track in Tracks.options" v-bind:key="track.id" v-bind:option="track" v-on:chosen-option="setChosenTrack"/>
    </div>
    <div class="row h-100 w-100 my-auto mx-auto track-select" v-if="menuSelect && !renderGame">
      <Menu v-for="icon in Icons.options" v-bind:key="icon.id" v-bind:option="icon" v-on:chosen-option="setChosenIcon"/>
    </div>
    <div class="h-100" v-if="renderGame === true">
      <div class="racetrack h-100 w-100 mx-auto my-auto" v-html="chosenTrack " />
      <div class="avatar" v-bind:style="{ top: this.racerYpos + 'px', left: this.racerXpos + 'px'}" v-html="chosenIcon" />
    </div>
  </div>
</template>

<style>

</style>
