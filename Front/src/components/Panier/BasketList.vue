<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Panier</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prix</th>
            <th scope="col">Quantité</th>
            <th scope="col">Total</th>
            <th scope="col">Supprimer</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in getPanierUserCourant" :key="item">
            <td>{{ item.libelle }}</td>
            <td>{{ item.prix }} €</td>
            <td>{{ item.quantite }}</td>
            <td>{{ item.prix * item.quantite }} €</td>
            <td>
              <button class="btn btn-danger" >Supprimer</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
<!--    <div class="row">-->
<!--      <div class="col-12">-->
<!--        <h2 class="text-center">Total : {{ total }} €</h2>-->
<!--      </div>-->
<!--    </div>-->
    <div class="row">
      <div class="col-12">
        <button class="btn btn-success" >Valider le panier</button>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters(['getPanierUserCourant', "getCurrentUser"]),
  },
  methods: {

  },
}

</script>


<style scoped>

</style>