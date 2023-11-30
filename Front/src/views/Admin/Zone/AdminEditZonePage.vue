<template>
  <div class="main">
    <edit-zone :selected_zone="this.$route.params.selected_zone"></edit-zone>
  </div>
</template>

<script>
import editZone from '@/components/Admin/Zone/EditZone.vue'

export default {
  /*
  data() {
    return {
      id_zone: null,
    }
  },

   */
  components: {
    editZone
  }
}
</script>

<style scoped>

.main{
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  margin-bottom: 5vh;
}

</style>
