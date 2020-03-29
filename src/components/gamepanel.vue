<script>
import Countdown from './countdown.vue'

export default {
  name: 'GamePanel',
  props: ['duration'],
  components: {
    Countdown,
  },
}

</script>

<template>
    <div class="container">
      <div class="row h-25">
        <div class="col">
          <Countdown v-bind:duration="duration" v-on:game-over="gameOver" />
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <!-- <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('disguise')">Disguise</a> -->
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <!-- <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('disguise')">Disguise</a> -->
        </div>
      </div>
      <div class="row h-25">
        <div class="col">
          <a class="btn btn-primary btn-lg" type="button" v-on:click="$emit('disguise')">Disguise</a>
        </div>
      </div>

    </div>
</template>
