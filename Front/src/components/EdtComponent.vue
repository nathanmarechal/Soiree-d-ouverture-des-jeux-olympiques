<template>
  <div class="alert alert-success" role="alert" v-if="schedule.length === 0" style="margin-top: 25%; margin-bottom: 25%">
    {{translate("emploiDuTemps_1")}}
  </div>
  <div v-else class="schedule-container" style="margin-top: 10%; margin-bottom: 10%">
    <h2>{{translate("emploiDuTemps_2")}}</h2>
    <div v-for="ligne in schedule" :key="ligne.id_creneau" class="schedule-item">
      <p class="time">{{ ligne.heure_creneau }}</p>
      <div class="event-details">
        <p class="event-title">{{ ligne.libelle }}</p>
        <p class="stand-name">{{ ligne.nom_stand }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {translate} from "../lang/translationService";

export default {

  computed: {
    ...mapGetters('user', ['getCurrentUser']),
    schedule() {
      return this.getCurrentUser.schedule;
    }
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    translate,
    ...mapActions('user', ['getScheduleByUserIdStore']),
    async loadData() {
      await this.getScheduleByUserIdStore();
    },
  }

};
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
  font-size: 16px;
  margin-bottom: 5px;
}

.stand-name {
  font-size: 14px;
  color: #555;
}
</style>