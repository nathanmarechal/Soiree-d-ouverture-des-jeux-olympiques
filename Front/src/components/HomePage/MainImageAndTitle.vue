<template>
  <div class="full-screen-image">
    <img :src="imageUrl" alt="Full Screen Image"/>
    <h1 class="image-title">Ouverture des jeux de Paris</h1>
  </div>
</template>

<script>
import image1 from '../../assets/HomePage/flamme.jpeg';
export default {
  name: 'FullScreenImage',
  data() {
    return {
      imageUrl: image1,
    }
  }
}
</script>

<style scoped>
.full-screen-image {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.full-screen-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
body {
  font-family: 'helvetica', sans-serif;
}

.image-title {
  position: absolute;
  top: 35%;
  right: 5%;
  color:wheat;
  max-width: 30%; /* Largeur maximale du titre */
  font-size: 5em;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

</style>