<template>
  <div class="main">
  <admin-show-statistique></admin-show-statistique>
  </div>

</template>


<script>
import adminShowStatistique from '@/components/Admin/Statistique/AdminShowStatistique.vue'


export default {
  components: {
    adminShowStatistique
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