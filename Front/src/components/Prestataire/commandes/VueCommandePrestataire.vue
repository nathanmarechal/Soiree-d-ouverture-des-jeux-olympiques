<template>
  <div class="alert alert-success" role="alert" v-if="commandes.length === 0" style="margin-top: 25%; margin-bottom: 25%">
    Il n'y a rien de prévu pour le moment
  </div>
  <div v-else class="schedule-container" style="margin-top: 10%; margin-bottom: 10%">
    <h2>Mes ventes :</h2>
    <div v-for="ligne in commandes" :key="ligne.id_creneau" class="schedule-item">
      <p class="time">{{ ligne.heure_creneau }}</p>
      <div class="event-details">
        <p class="event-title">{{ligne.libelle }}</p>
        <p class="stand-name">quantité : {{ ligne.quantite }}</p>
        <p class="stand-name">prix : {{ ligne.prix }}</p>
        <p class="stand-name">prix total : {{ ligne.prix_total }}</p>
      </div>
    </div>
  </div>

</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      commandes: [],
    }
  },
  computed: {
      ...mapGetters(['getCurrentUser', 'getCommandePrestataire']),
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  methods: {
    ...mapActions(['getCommandesPrestataireStore']),
    async loadData(){
      await this.getCommandesPrestataireStore(this.getCurrentUser.id_user);
      this.commandes = this.getCommandePrestataire;
      console.log(this.commandes + " dans le vue");
    },
  }
}

</script>

<style scoped>
.schedule-container {
  max-width: 600px;
  margin: 0 auto;
}

.schedule-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 18px;
  font-weight: bold;
}

.event-details {
  flex-grow: 1;
  margin-left: 10px;
}

.event-title {
  font-size: 20px;
  margin-bottom: 5px;
}

.stand-name {
  font-size: 14px;
  color: #555;
}
</style>