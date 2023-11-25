<template>
  <div class="main" style="margin-top: 8vh;  width: 90%; height: 80vh">
    <edit-areas style="width: 100% ; height: 100%"> </edit-areas>
  </div>

</template>


<script>
import EditAreas from '@/components/Admin/Emplacement/EditAreas.vue'


export default {
  components: {
    EditAreas
  }
}
</script>

<style scoped>

.main{
  display: flex;
  justify-content: center;
}

</style>