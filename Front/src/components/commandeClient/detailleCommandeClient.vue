<template>
  <div class="container mt-5" >
    <h2 class="text-center" style="margin-top: 15%">Détail des Commandes</h2>
    <div class="mb-5" >
      <h3>Commande #{{ commande.id_commande }}</h3>
      <p><strong>Date:</strong> {{ commande.date_commande }}</p>
      <p><strong>État:</strong> {{ commande.libelle }}</p>
      <p><strong>Prix Total:</strong> {{ commande.prix_total }} €</p>
      <p><strong>Nombre de Prestations:</strong> {{ commande.nbr_presta }}</p>

      <div style="margin-bottom: 13%" v-if="this.commande.lignes_commande">
        <h4 class="mt-4">Détails des Prestations</h4>
        <table class="table table-striped">
          <thead class="thead-light">
          <tr>
            <th>Prestation</th>
            <th>Type</th>
            <th>Créneau</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Etat</th>
            <th>QRcode</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ligne in this.commande.lignes_commande" :key="ligne.id">
            <td>{{ ligne.prestation_libelle }}</td>
            <td>{{ ligne.type_prestation_libelle }}</td>
            <td>{{ ligne.creneau}}</td>
            <td>{{ ligne.quantite }}</td>
            <td>{{ ligne.prix }} €</td>
            <td>{{ ligne.etat_libelle}}</td>
            <td><QRComponent :ligne_commande="ligne" :id_user="getCurrentUser.id_user" ></QRComponent></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters} from "vuex";
import QRComponent from "@/components/QRComponent.vue";
export default {
  name: 'DetailCommande',
  components: {
    QRComponent
  },

  data() {
    return {
      commande: null,
      commandeId: null,
      commandeDetails: null
    };
  },
  computed: {
    ...mapGetters('user', ['getCurrentUser', 'getCommandeUserCourantGetters','getLigneCommandeBycommandeId','getCommandeById'])
  },

  async mounted() {
    await this.loadCommandeDetails();
    this.commande = this.getCommandeById(this.$route.params.id);
  },

  methods: {
    ...mapActions('user',['getLigneCommandebyIdCommandeStore']),

    async loadCommandeDetails() {
      await this.getLigneCommandebyIdCommandeStore(this.$route.params.id)
    }
  }
};

</script>


<style scoped>
</style>