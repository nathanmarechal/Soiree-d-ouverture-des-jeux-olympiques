<template>
  <div class="main">
    <router-link to="/prestataire/prestations/add" class="btn btn-success">{{translate("showPrestationPrestatairePage_1")}}</router-link>
    <show-prestation-prestataire></show-prestation-prestataire>
  </div>
</template>

<script>

import showPrestationPrestataire from '@/components/Prestataire/Prestation/ShowPrestationPrestataire.vue'
import {translate} from "../../../lang/translationService";
export default {
  methods: {translate},
  components: {
    showPrestationPrestataire
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