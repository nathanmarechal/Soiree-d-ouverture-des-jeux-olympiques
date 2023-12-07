<template>
  <div style="margin-top: 10%">
    <h2>Détail des Commandes</h2>
    <div v-for="commande in getCurrentUser.commandes[commandeId]" :key="commande.id_commande" class="mb-5">
      <h3>Commande #{{ commande.id_commande }}</h3>
      <p><strong>Date:</strong> {{ commande.date_commande }}</p>
      <p><strong>État:</strong> {{ commande.libelle }}</p>
      <p><strong>Prix Total:</strong> {{ commande.prix_total }} €</p>
      <p><strong>Nombre de Prestations:</strong> {{ commande.nbr_presta }}</p>

      <div v-if="commande.lignes_commande">
        <h4>Détails des Prestations</h4>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Prestation</th>
            <th>Type</th>
            <th>Quantité</th>
            <th>Prix</th>
          </tr>
          </thead>
          <tbody>
          <div v-for="commande in getCurrentUser.commandes[commandeId].lignes_commande" :key="commande.id_presta">
          <tr>
            <td>{{ commande.lignes_commande.prestation_libelle }}</td>
            <td>{{ commande.lignes_commande.type_prestation_libelle }}</td>
            <td>{{ commande.lignes_commande.quantite }}</td>
            <td>{{ commande.lignes_commande.prix }} €</td>
          </tr>
          </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'DetailCommande',

  data() {
    return {
      commandeId: null,
      commandeDetails: null
    };
  },
  computed: {
    ...mapGetters(['getCommandeUserCourantGetters', "getCurrentUser", 'getLigneCommandeBycommandeId']),

  },

  created() {
    this.commandeId = this.$route.params.id;
    this.loadCommandeDetails();
  },

  methods: {
    ...mapActions(['getLigneCommandebyIdCommandeStore']),

    loadCommandeDetails() {
      this.getLigneCommandebyIdCommandeStore(this.commandeId)
    }
  }
};
</script>
<style scoped>
/* Ici, vous pouvez ajouter votre CSS personnalisé si nécessaire */
</style>