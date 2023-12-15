<template>
  <div class="main" >
    <legende></legende>
    <edit-areas style="width: 75% ; height: 100%"> </edit-areas>
  </div>

</template>


<script>
import EditAreas from '@/components/Admin/Emplacement/EditAreas.vue'
import Legende from '@/components/Admin/Emplacement/LegendeMap.vue'

export default {
  components: {
    EditAreas,
    Legende
  }
}
</script>

<style scoped>

.main{
  margin-top: 10vh;
  margin-bottom: 5vh;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: space-around;
  margin-bottom: 5%;
  margin-top: 15vh;
  width: 100%;
  height: 80vh
}

</style>