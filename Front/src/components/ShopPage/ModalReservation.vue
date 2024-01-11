<template>
  <div v-if="isReservationSelected" class="overlay">
    <div class="modal-inner">
      <h4>{{ translate("modalReservation_1") }}</h4>
      <table class="table">
        <tbody>
        <tr>
          <th>{{ translate("modalReservation_2") }}</th>
          <td>{{ prestation.libelle }}</td>
        </tr>
        <tr>
          <th>{{ translate("modalReservation_3") }}</th>
          <td>{{ prestation.prix }} €</td>
        </tr>
        <tr>
          <th>{{ translate("modalReservation_4") }}</th>
          <td>
            <div class="options d-flex flex-fill">
              <select required class="custom-select mr-1" v-model="creneau">
                <option v-for="(creneaux, index) in getAllCreneau" :value="creneaux.id_creneau" :key="index">{{ creneaux.heure_creneau }}</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th>{{ translate("modalReservation_5") }}</th>
          <td>
            <input required type="number" v-model.number="quantite" min="1">
          </td>
        </tr>
        <tr>
          <th>{{ translate("modalReservation_6") }}</th>
          <td>{{ total }} €</td>
        </tr>
        </tbody>
      </table>



      <div class="d-flex justify-content-between">
        <button @click="validerReservation()" type="button" class="btn btn-success">{{ translate("modalReservation_7") }}</button>
        <button @click="$emit('close')" type="button" class="btn btn-danger">{{ translate("modalReservation_8") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {translate} from "@/lang/translationService";

export default {
  props: ["isReservationSelected", "prestation"],
  data() {
    return {
      creneau: null,
      quantite: 1,
    };
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
    if (this.getAllCreneau.length > 0) {
      this.creneau = this.getAllCreneau[0].id_creneau;
    }
    //this.creneau = this.getAllCreneau;
  },

  computed: {
    ...mapGetters('creneau', ['getAllCreneau']),
    ...mapGetters('user', ['getCurrentUser', "getPanierUserCourant"]),
    total() {
      return this.prestation.prix * this.quantite;
    },
  },

  methods: {
    translate,
    ...mapActions('user', ['getPanierUserCourantStore', 'addPrestationToPanierUserCourantStore', "updateSoldeStore" ]),
    ...mapActions('creneau', ['getCreneauStore']),
    async loadData(){
      if (this.getAllCreneau.length === 0)
        await this.getCreneauStore()
      if (this.getPanierUserCourant.length === 0)
        await this.getPanierUserCourantStore(this.getCurrentUser.id_user)
    },
    async validerReservation() {
      await this.addPrestationToPanierUserCourantStore({
        id_prestation: this.prestation.id_prestation,
        id_user: this.getCurrentUser.id_user,
        quantite: this.quantite,
        id_creneau: this.creneau,
      });
      console.log("valider reservation : "+ this.prestation.id_prestation + " " + this.getCurrentUser.id_user + " " + this.quantite + " " + this.creneau)

      await this.getPanierUserCourantStore(this.getCurrentUser.id_user)
      this.$emit('close');},
  },
}
</script>




<style scoped>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.modal-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.modal-inner img {
  border-radius: 15px;
  max-width: 25vh;
  margin-bottom: 20px;
}

</style>