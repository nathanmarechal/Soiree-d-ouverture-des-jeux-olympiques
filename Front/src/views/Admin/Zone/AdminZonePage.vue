<template>
  <div class="main">
    <router-link to="/admin/zones/add" class="btn btn-success">{{translate("zone_1")}}</router-link>
    <show-zone></show-zone>
  </div>

</template>


<script>
import ShowZone from '@/components/Admin/Zone/ShowZone.vue'
import {translate} from "../../../lang/translationService";


export default {
  methods: {translate},
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