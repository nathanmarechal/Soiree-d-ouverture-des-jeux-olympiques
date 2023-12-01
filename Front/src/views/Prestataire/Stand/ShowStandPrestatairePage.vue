<template>
  <div class="main">
      <show-stand-prestataire></show-stand-prestataire>
  </div>
</template>

<script>
  import showStandPrestataire from '@/components/Prestataire/Stand/ShowStandPrestataire.vue'
export default {
  components: {
    showStandPrestataire
  }
}
</script>

<style scoped>

.main{
  margin-top: 15vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>