<template>
  <div style="margin-top: 10vh" class="container py-5">
    <!-- Si aucune commande n'est présente, afficher une alerte -->
    <div class="alert alert-success text-center" role="alert" v-if="commandes.length === 0">
      {{ translate("commandePrestataire_1") }}
    </div>
    <!-- Sinon, afficher la liste des commandes -->
    <div v-else>
      <h2 class="mb-4 text-center">{{ translate("commandePrestataire_2") }}</h2>
      <div v-for="ligne in commandes" :key="ligne.id_creneau" class="mb-3">
        <div class="card">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-3">
                <h5 class="card-title">{{ ligne.libelle }}</h5>
              </div>
              <div class="col-sm-3">
                <h6 class="card-subtitle mb-2 text-muted">{{ ligne.heure_creneau }}</h6>
              </div>
              <div class="col-sm-2">
                <p class="card-text">{{ translate("commandePrestataire_3") }} {{ ligne.quantite }}</p>
              </div>
              <div class="col-sm-2">
                <p class="card-text">{{ translate("commandePrestataire_4") }} {{ ligne.prix }}€</p>
              </div>
              <div class="col-sm-2">
                <p class="card-text">{{ translate("commandePrestataire_5") }} {{ ligne.prix_total }}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { translate } from "../../../lang/translationService";

export default {
  data() {
    return {
      commandes: [],
    }
  },
  computed: {
    ...mapGetters('user', ['getCurrentUser', 'getCommandePrestataire']),
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  methods: {
    translate,
    ...mapActions('user', ['getCommandesPrestataireStore']),
    async loadData() {
      await this.getCommandesPrestataireStore();
      this.commandes = this.getCommandePrestataire;
    },
  }
}
</script>
