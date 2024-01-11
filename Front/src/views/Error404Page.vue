<template>
  <div class="main">
    <h1>{{translate("erro_1")}}</h1>
    <h2>{{translate("erro_2")}}</h2>
    <img src="@/assets/paris_2024_logo.svg" alt="Clown" @click="toggleRotation">
    <h3>{{translate("erro_3")}}</h3>
    <router-link to="/">
      <button @click="playAudio" class="btn-success">{{translate("erro_4")}}</button>
    </router-link>
  </div>
</template>

<script>
import {translate} from "../lang/translationService";

export default {
  data() {
    return {
      isRotating: false,
    };
  },
  methods: {
    translate,
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
