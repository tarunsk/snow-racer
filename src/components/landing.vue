<script>
export default {
  name: 'Landing',
  props: ['onPlayPress'],
}
</script>

<template>
  <div class="landing h-100">
    <div class="container-fluid d-flex h-100">
    <div class="jumbotron my-auto d-flex flex-column align-items-center opacity-4">
      <h1 class="display-4">Welcome Wolverines!</h1>
      <p class="lead">Need a break from that midterm next week? Or craving to go on a sled adventure? We've got something for you.<p>
      <hr class="my-4">
      <p class="p-2">Snow Racer is a 2D racing game themed around winter in Ann Arbor. Use your arrow keys to control your sled and get around the track as fast as possible! Be warned, there may be obstacles along the way...</p>
      <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('play-now')">Play Now!</a>
    </div>
    </div>
  </div>
</template>
