<template>
  <div class="main">
    <h1>Vous êtes perdus!</h1>
    <h2>Error 404</h2>
    <img src="@/assets/stand/arthur-clown.png" alt="Arthur Clown" @click="toggleRotation">
    <h3>Vous pouvez retourner sur la page principale</h3>
    <router-link to="/">
      <button @click="playAudio" class="btn-success">Page Principale</button>
    </router-link>
    <button class="btn btn-danger" @click="playAudio"> The Clown Main Theme</button>
    <audio ref="audioPlayer" src="@/assets/Music/arthur-main-sound.mp3"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRotating: false,
    };
  },
  methods: {
    playAudio() {
      this.$refs.audioPlayer.play();
    },
    toggleRotation() {
      this.isRotating = !this.isRotating;
    }
  }
};
</script>

<style scoped>
.main {
  margin-top: 10vh;
  margin-bottom: 5vh;
  text-align: center;
}

img {
  width: 20%;
  cursor: pointer;
  transition: transform 1s;
}

img:hover {
  transform: rotate(360deg);
}

.btn-success {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
