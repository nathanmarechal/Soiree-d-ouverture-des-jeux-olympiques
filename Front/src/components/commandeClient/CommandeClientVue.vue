<template>
 <div>
   <table class="table table-striped">
     <thead>
     <tr>
       <th scope="col">date</th>
       <th scope="col">Prix</th>
       <th scope="col">etat de la commande</th>
       <th scope="col">nombre de prestations</th>
     </tr>
     </thead>
     <tbody>
     <tr v-for="item in getCommandesUserCourant" :key="item.id_commande">
       <td>{{ item.date_commande }}</td>
       <td>{{ item.prix_total }} €</td>
       <td>{{item.libelle}}</td>
       <td>{{item.nbr_presta}}</td>

       <button class="btn btn-info">voir le détail</button>
     </tr>
     </tbody>
   </table>
 </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(['getCommandesUserCourant']),
  },
  created() {
    console.log("getCommandesUserCourant",this.getCommandesUserCourant)
  }

}

</script>

<style scoped>

</style>