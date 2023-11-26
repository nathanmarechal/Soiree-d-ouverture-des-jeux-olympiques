<template>
  <div class="main" :class="{ rotate: isRotating }">
    <h1>Vous êtes perdus !</h1>
    <h2>Error 404</h2>
    <img style="width: 20%" src="@/assets/stand/arthur-clown.png" alt="Arthur Clown">
    <h3>Vous pouvez retourner sur la page principale</h3>
    <router-link to="/">
      <button class="btn-success">Page Principale</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRotating: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isRotating = false;
    }, 1000); // Stop rotating after 10 seconds
  },
};
</script>

<style scoped>
.main {
  margin-top: 10vh;
  margin-bottom: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rotate {
  animation: rotation 1s linear;
}

.btn-success {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
