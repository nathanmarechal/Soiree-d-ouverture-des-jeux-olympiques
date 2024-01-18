<script>
import ValidLigneCommandeComponent from "@/components/ValidLigneCommandeComponent.vue";
export default {
  data() {
    return {
      id_prestation: this.$route.params.id_prestation,
      id_creneau: this.$route.params.id_creneau,
      id_commande: this.$route.params.id_commande,
    }
  },
  components: {
    ValidLigneCommandeComponent,
  }
};
</script>

<template>
  <div style="margin-top: 10%; margin-bottom:5%; " >
    <ValidLigneCommandeComponent :id_presta="id_prestation" :id_creneau="id_creneau" :id_commande="id_commande"/>
  </div>
</template>

<style scoped>

</style>