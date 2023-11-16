<template>
  <div class="main">
    <img :src="image" alt="parcours">
  </div>
</template>


<script>
import image from '../assets/parcours.jpg';

export default {
  data() {
    return {
      image: image,
    }
  }

}
</script>

<style scoped>


</style>