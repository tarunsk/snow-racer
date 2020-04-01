<script>
export default {
  name: 'Landing',
  props: ['onPlayPress'],
  data: function() {
    return {
      showTutorial: false,
      slide1: require('../assets/img/slide1.png'),
      slide2: require('../assets/img/slide2.png'),
      slide3: require('../assets/img/slide3.png'),
    }
  },
  methods: {
    displayTutorial: function() {
      this.showTutorial = true;
    }
  }
}
</script>

<template>
  <div class="landing h-100">
    <div class="container-fluid d-flex h-100">
    <div v-if="!showTutorial" class="jumbotron my-auto mx-auto d-flex flex-column align-items-center opacity-4">
      <h1 class="display-4">Welcome Wolverines!</h1>
      <p class="lead">Need a break from that midterm next week? Craving a winter adventure? We've got something for you.</p>
      <button class="btn btn-link" v-on:click="displayTutorial" style="margin-bottom: 5%;">How do I play?</button>
      <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('play-now')">Play Now!</a>
    </div>
    <div v-if="showTutorial" class="jumbotron my-auto mx-auto d-flex flex-column align-items-center w-75">
      <div id="carouselExampleControls" class="carousel slide w-100" data-ride="carousel" data-interval="false">
        <div class="carousel-inner w-75 mx-auto">
          <div class="carousel-item active">
            <img class="d-block w-100" v-bind:src="slide1" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" v-bind:src="slide2" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" v-bind:src="slide3" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('play-now')" style="margin-top: 2%;">Play Now!</a>
    </div>
    </div>
  </div>
</template>
