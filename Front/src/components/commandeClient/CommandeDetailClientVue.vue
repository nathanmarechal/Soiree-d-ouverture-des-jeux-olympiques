<template>
  <div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">date</th>
        <th scope="col">Prix</th>
        <th scope="col">etat de la commande</th>
        <th scope="col">nombre de prestations</th>
        <th scope="col">Voir plus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in ligneCommande" :key="item.id_ligne_commande">
        <td>{{convertDateFormat(item.date_commande)}}</td>
        <td>{{ item.prix_total }} €</td>
        <td>{{item.libelle}}</td>
        <td>{{item.nbr_presta}}</td>
        <td><button class="btn btn-info">voir le détail</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

</script>

<style scoped>

</style>