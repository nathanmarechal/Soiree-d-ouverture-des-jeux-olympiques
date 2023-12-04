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
     <tr v-for="item in commande" :key="item.id_commande">
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


import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      commande : this.$store.state.userCourant.commandes,
    }
  },
  computed: {
    ...mapGetters(['getCommandeUserCourantGetters', "getCurrentUser"]),
  },
      // this.getCommandeUserCourantStore(this.getCurrentUser.id_user)
      //     .then(res=>{
      //       console.log("commande : ", res)
      //       this.$store.commit('SET_COMMANDES_USER_COURANT', res)
      //     })
  methods: {
    ...mapActions(['getCommandeUserCourantStore']),
  }

}

</script>

<style scoped>

</style>