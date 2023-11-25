<template>
  <div class="main" style="margin-top: 10vh;  width: 100%;">
    <add-zone></add-zone>
  </div>
</template>


<script>
import addZone from '@/components/Admin/Zone/AddZone.vue'


export default {
  components: {
    addZone
  }
}
</script>

<style scoped>

.main{
  display: flex;
  justify-content: center;
}

</style>