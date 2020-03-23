<script>
// import Tracks from '../assets/tracks.json'

// import Images from '../assents/img'

export default {
  name: 'Menu',
  methods: {
    getSRC: function(track, type) {
      console.log("assets/img/tracks/" + track.toLowerCase() + "/" + type);
      return "../assets/img/tracks/" + track.toLowerCase() + "/" + type;
    },
  },
  props: ['option'],

}
</script>

<template>
<div class="card my-auto bg-dark text-white menu-item opacity-5 col">
    <div class="h-75 w-100 mx-auto my-auto thumbnail" v-if="option.img !== null" style="text-align:center;">
        <img class="h-100 my-auto mx-auto" v-bind:src="option.img"/>
    </div>
    <div class="w-100 h-25 my-auto d-flex justify-content-center difficulty-label">
        <h5 class="card-title my-auto mx-auto">{{option.name}}</h5>
    </div>
    <div class="overlay">
        <a v-on:click="$emit('chosen-option', option.name)" class="icon">
            <i class="fa fa-play"></i>
        </a>
    </div>
</div>
</template>
