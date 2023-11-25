<template>
  <div class="main" style="margin-top: 8vh;  width: 100%; height: 80vh">
    <show-color-zone></show-color-zone>
    <edit-areas style="width: 75% ; height: 100%"> </edit-areas>
  </div>

</template>


<script>
import EditAreas from '@/components/Admin/Emplacement/EditAreas.vue'
import ShowColorZone from '@/components/Admin/Emplacement/ShowColorZone.vue'

export default {
  components: {
    EditAreas,
    ShowColorZone
  }
}
</script>

<style scoped>

.main{
  display: flex;
  justify-content: space-around;
}

</style>