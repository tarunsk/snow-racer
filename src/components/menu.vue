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
    <div class="track-thumbnail">
        <div v-html="option.svg"/>
    </div>
    <div class="mx-auto my-auto difficulty-label">
        <h5 class="card-title">{{option.name}}</h5>
    </div>
    <div class="overlay">
        <a v-on:click="$emit('chosen-option', option.svg)" class="icon">
            <i class="fa fa-play"></i>
        </a>
    </div>
</div>
</template>
