<template>
  <div class="stats-container">

    <div class="stat-box">
      <h3>{{translate("statistiquesPrestataire_3")}}</h3>
      <div class="stat-content" v-if="bestClient">
        <p class="stat-name">{{translate("statistiquesPrestataire_5")}} : <span>{{ bestClient.name }}</span></p>
        <p class="stat-value">{{translate("statistiquesPrestataire_6")}} : <span>{{ bestClient.best_client }}€</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <div class="stat-box">
      <h3>{{translate("statistiquesPrestataire_4")}}</h3>
      <div class="stat-content" v-if="averagePurchase">
        <p class="stat-value"> <span>{{ averagePurchase.average_purchase.toFixed(2) }}€</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <div class="stat-box">
      <h3>{{translate("statistiquesPrestataire_7")}}</h3>
      <div class="stat-content" v-if="avgRating">
        <p class="stat-value"><span>{{ avgRating.avg_rating}}</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>

    <div class="stat-box">
      <h3>{{translate("statistiquesPrestataire_8")}}</h3>
      <div class="stat-content" v-if="countRating">
        <p class="stat-value"> <span>{{ countRating.nb_rating }}</span></p>
      </div>
      <p v-else>Chargement...</p>
    </div>



  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getBestClientByStand,
  getAveragePurchaseByStand,
  getAvgRatingByStand, // Import the new function
  getCountRatingByStand // Import the new function
} from '@/services/statistiques.service';import {translate} from "../../../lang/translationService";

export default {
  name: 'StandStatistics',
  data() {
    return {
      bestClient: null,
      averagePurchase: null,
      avgRating: null,
      countRating: null
    };
  },
  computed: {
    ...mapGetters(['getCurrentUser'])
  },
  async mounted() {
    await this.loadStatistics();
  },
  methods: {
    translate,
    async loadStatistics() {
      try {
        const standId = this.getCurrentUser.id_stand;
        [this.bestClient] = await getBestClientByStand(standId);
        [this.averagePurchase] = await getAveragePurchaseByStand(standId);
        [this.avgRating] = await getAvgRatingByStand(standId);
        [this.countRating] = await getCountRatingByStand(standId);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques :', error);
      }
    }
  }
}
</script>

<style scoped>
.stats-container {
  margin: 2vh;
  display: flex;
  justify-content: space-around;
  gap: 2vh;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.stat-box {
  background: white;
  border: none;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  width: 40%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.stat-box h3 {
  color: #007bff;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
}

.stat-content {
  background: #f2f2f2;
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
}

.stat-name, .stat-value {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

.stat-name span, .stat-value span {
  color: #333;
  font-weight: bold;
}
</style>
