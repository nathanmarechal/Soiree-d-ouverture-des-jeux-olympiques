<template>
  <div class="main">
    <router-link to="/admin/zones/add" class="btn btn-success">Ajouter une zone</router-link>
    <show-zone></show-zone>
  </div>

</template>


<script>
import ShowZone from '@/components/Admin/Zone/ShowZone.vue'


export default {
  components: {
    ShowZone
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