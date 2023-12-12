<template>
  <div>
    <h1>La commande a été récupérée</h1>
  </div>
</template>


<script>
import {mapActions} from "vuex";

export default {
  name: 'ValidLigneCommandeComponent',
  props: ["id_presta", "id_creneau", "id_user", "id_commande" ],

  methods:{
    ...mapActions(['setEtatLigneCommandeExterieurStore']),
    async setData(){
      console.log({
        id_commande: this.id_commande,
        id_prestation: this.id_presta,
        id_creneau: this.id_creneau
      });

      console.log(this.id_presta)
      await this.setEtatLigneCommandeExterieurStore({
        id_commande: this.id_commande,
        id_prestation: this.id_presta,
        id_creneau: this.id_creneau
      } )
    }
  },
  async mounted() {
    await this.setData()
  }
}
</script>


<style scoped>

</style>