<template>
  <div class="main" style="margin-top: 10vh;  width: 90%;">
    <show-zone></show-zone>
  </div>

</template>


<script>
import ShowZone from '../components/Admin/Zone/ShowZone.vue'


export default {
  components: {
    ShowZone
  }
}
</script>

<style scoped>

.main{
  display: flex;
  justify-content: center;
}

</style>