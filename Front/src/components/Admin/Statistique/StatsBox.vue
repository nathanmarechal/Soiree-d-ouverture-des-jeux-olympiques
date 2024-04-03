<template>
  <div class="container py-4">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <!-- Number of Stands -->
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column justify-content-center text-center">
            <h5 class="card-title">{{ translate("adminStatistics_numberOfStands") }}</h5>
            <div class="card-text" v-if="nbStands">
              <span class="stat-value fs-4 fw-bold">{{ nbStands.nb_prestataires }}</span>
            </div>
            <p v-else>Chargement...</p>
          </div>
        </div>
      </div>

      <!-- Number of Available Prestations -->
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column justify-content-center text-center">
            <h5 class="card-title">{{ translate("adminStatistics_numberOfPrestations") }}</h5>
            <div class="card-text" v-if="nbPrestationsAvailable">
              <span class="stat-value fs-4 fw-bold">{{ nbPrestationsAvailable.nb_prestations_available }}</span>
            </div>
            <p v-else>Chargement...</p>
          </div>
        </div>
      </div>

      <!-- Number of Users -->
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column justify-content-center text-center">
            <h5 class="card-title">{{ translate("adminStatistics_numberOfUsers") }}</h5>
            <div class="card-text" v-if="nbUsers">
              <span class="stat-value fs-4 fw-bold">{{ nbUsers.nb_users }}</span>
            </div>
            <p v-else>Chargement...</p>
          </div>
        </div>
      </div>

      <!-- Average Global Purchase -->
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column justify-content-center text-center">
            <h5 class="card-title">{{ translate("adminStatistics_averagePurchase") }}</h5>
            <div class="card-text" v-if="averagePurchase">
              <span class="stat-value fs-4 fw-bold">{{ averagePurchase.average_purchase_global.toFixed(2) }}€</span>
            </div>
            <p v-else>Chargement...</p>
          </div>
        </div>
      </div>

      <!-- Top Seller Stand -->
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-center">{{ translate("adminStatistics_topSellerStand") }}</h5>
            <div class="text-center" v-if="topSellerStand">
              <span class="stat-name d-block fs-5 fw-bold">{{ topSellerStand.nom_stand }}</span>
              <img class="img-fluid my-2" :src="getImageSrc(topSellerStand.image_stand)" alt="Image de la prestation" style="max-height: 10vh;">
              <div class="stat-value fs-4 fw-bold">{{ topSellerStand.sales_revenue }}€</div>
            </div>
            <p v-else>Chargement...</p>
          </div>
        </div>
      </div>

      <!-- Top Avis Stand -->
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-center">{{ translate("adminStatistics_topAvisStand") }}</h5>
            <div class="text-center" v-if="topAvisStand">
              <span class="stat-name d-block fs-5 fw-bold">{{ topAvisStand.nom_stand }}</span>
              <img class="img-fluid my-2" :src="getImageSrc(topAvisStand.image_stand)" alt="Image du stand" style="max-height: 10vh;">
              <div class="stat-value fs-4 fw-bold">{{ topAvisStand.top_avg_rating }} / 5.0</div>
            </div>
            <p v-else>Chargement...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getNbStands,
  getNbPrestationsAvailable,
  getNbUsers,
  getAveragePurchase,
  getTopSellerStand,
  getTopAvisStand
} from '@/services/statistiques.service';
import { translate } from "../../../lang/translationService";

export default {
  name: 'AdminStatistics',
  data() {
    return {
      nbStands: null,
      nbPrestationsAvailable: null,
      nbUsers: null,
      averagePurchase: null,
      topSellerStand: null,
      topAvisStand: null
    };
  },
  computed: {
    ...mapGetters('user', ['getSessionId'])
  },
  async mounted() {
    await this.loadStatistics();
  },
  methods: {
    translate,
    async loadStatistics() {
      try {
        [this.nbStands] = await getNbStands();
        [this.nbPrestationsAvailable] = await getNbPrestationsAvailable();
        [this.nbUsers] = await getNbUsers();
        [this.averagePurchase] = await getAveragePurchase();
        [this.topSellerStand] = await getTopSellerStand();
        [this.topAvisStand] = await getTopAvisStand();
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    },
    getImageSrc(imageName) {
      try {
        return require('./../../../../../Back/assets/stand/profile/' + imageName)
      } catch {
        return require('@/assets/clown.png'); // Image par défaut en cas d'erreur
      }
    },
  }
}
</script>
