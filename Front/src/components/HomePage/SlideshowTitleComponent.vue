<template>
  <div class="container text-center my-5">
    <h1 class="display-4 border-bottom pb-2">{{ SlideTitle }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SlideTitle: "Les monuments de paris mis à l'honneur"
    }
  }
}
</script>

<style scoped>
h1.display-4 {
  color: #343a40;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>