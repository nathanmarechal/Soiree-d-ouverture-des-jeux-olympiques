<template>
  <div v-if="isReservationSelected" class="overlay">
    <div class="modal-inner">
      <h4>Réserver</h4>
      <table class="table">
        <tbody>
        <tr>
          <th>Libellé</th>
          <td>{{ prestation.libelle }}</td>
        </tr>
        <tr>
          <th>Prix</th>
          <td>{{ prestation.prix }} €</td>
        </tr>
        <tr>
          <th>Crénau</th>
          <td>
            <div class="options d-flex flex-fill">
              <select class="custom-select mr-1">
                <option v-for="creneau in getAllCreneau" :key="creneau" >{{ creneau.time }}</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th>Quantité</th>
          <td>
            <input type="number" v-model.number="quantite" min="1">
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>{{ total }} €</td>
        </tr>
        </tbody>
      </table>



      <div class="d-flex justify-content-between">
        <button @click="validerReservation" type="button" class="btn btn-success">Valider</button>
        <button @click="$emit('close')" type="button" class="btn btn-danger">Quitter</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ["isReservationSelected", "prestation"],
  data() {
    return {
      quantite: 1,
    };
  },
  computed: {
    ...mapGetters(['getAllCreneau']),
    total() {
      return this.prestation.prix * this.quantite;
    },
  },
  methods: {
    validerReservation() {
      // Logique de validation de la réservation
      console.log("Réservation validée", { prestation: this.prestation, quantite: this.quantite, total: this.total });
      // Fermer la modale après validation
      this.$emit('close');
    },
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