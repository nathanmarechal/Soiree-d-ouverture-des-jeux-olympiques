<template>
  <div class="stats-container">
    <!-- Number of Stands -->
    <div class="stat-box">
      <h3>{{ translate("adminStatistics_numberOfStands") }}</h3>
      <div class="stat-content" v-if="nbStands">
        <p class="stat-value"><span>{{ nbStands.nb_prestataires }}</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <!-- Number of Available Prestations -->
    <div class="stat-box">
      <h3>{{ translate("adminStatistics_numberOfPrestations") }}</h3>
      <div class="stat-content" v-if="nbPrestationsAvailable">
        <p class="stat-value"><span>{{ nbPrestationsAvailable.nb_prestations_available }}</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <!-- Number of Users -->
    <div class="stat-box">
      <h3>{{ translate("adminStatistics_numberOfUsers") }}</h3>
      <div class="stat-content" v-if="nbUsers">
        <p class="stat-value"><span>{{ nbUsers.nb_users }}</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <!-- Average Global Purchase -->
    <div class="stat-box">
      <h3>{{ translate("adminStatistics_averagePurchase") }}</h3>
      <div class="stat-content" v-if="averagePurchase">
        <p class="stat-value"><span>{{ averagePurchase.average_purchase_global.toFixed(2) }}€</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <!-- Top Seller Stand -->
    <div class="stat-box">
      <h3>{{ translate("adminStatistics_topSellerStand") }}</h3>
      <div class="stat-content" v-if="topSellerStand">
        <p class="stat-name"><span>{{ topSellerStand.nom_stand }}</span></p>
        <img
            class="stat-image"
            style="height: 10vh; width: 10vh;"
            :src="getImageSrc(topSellerStand.image_stand)"
            alt="Image de la prestation"
        >
        <p class="stat-value"><span>{{ topSellerStand.sales_revenue }}€</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <div class="stat-box">
      <h3>{{ translate("adminStatistics_topAvisStand") }}</h3>
      <div class="stat-content" v-if="topAvisStand">
        <p class="stat-name"><span>{{ topAvisStand.nom_stand }}</span></p>
        <img
            class="stat-image"
            style="height: 10vh; width: 10vh;"
            :src="getImageSrc(topAvisStand.image_stand)"
            alt="Image du stand"
        >
        <p class="stat-value"><span>{{ topAvisStand.top_avg_rating }} / 5.0</span></p>
      </div>
      <p v-else>Chargement...</p>
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

<style scoped>
.stats-container {
  display: flex;
  justify-content: space-around;
  gap: 2vh;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.stat-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: white;
  border-radius: 15px;
  margin: 1vh;
  padding: 30px;
  width: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-box h3 {
  color: #007bff;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
}

.stat-image {
  display: block; /* Assure que l'image est traitée comme un bloc */
  margin: auto; /* Centre l'image horizontalement */
  /* Si nécessaire, ajouter du CSS pour le centrage vertical */
}


.stat-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  background: #f2f2f2;
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
}

.stat-name, .stat-value {
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

.stat-name span, .stat-value span {
  color: #333;
  font-weight: bold;
}
</style>