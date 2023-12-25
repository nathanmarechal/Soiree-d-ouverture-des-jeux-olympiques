<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Waiting users</h1>
          <div class="alert alert-success" role="alert" v-if="users.length === 0">
            No waiting users
          </div>
          <div v-else>
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">email</th>
              <th scope="col">password</th>
              <th scope="col">nom</th>
              <th scope="col">prenom</th>
              <th scope="col">code_postal</th>
              <th scope="col">adresse</th>
              <th scope="col">commune</th>
              <th scope="col">id_role</th>
              <th scope="col">id_stand</th>
              <th scope="col">droits</th>
              <th scope="col">action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id_user">
              <td>{{user.id_user}}</td>
              <td>{{user.email}}</td>
              <td>{{user.password}}</td>
              <td>{{user.nom}}</td>
              <td>{{user.prenom}}</td>
              <td>{{user.code_postal}}</td>
              <td>{{user.adresse}}</td>
              <td>{{user.commune}}</td>
              <td>{{user.id_role}}</td>
              <td>{{user.id_stand}}</td>
              <td>{{user.droits}}</td>
              <td>
                <button class="btn btn-success" @click="acceptUser(user.id_user)">Accept</button>
                <button class="btn btn-danger" @click="refuseUser(user.id_user)">Refuse</button>
              </td>
            </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    data() {
      return {
        users: [],
      }
    },
    computed: {
      ...mapGetters(['getAllUsersAttente']),
    },
    methods: {
      ...mapActions([ 'acceptUserStore', 'refuseUserStore', 'getAllUsersAttenteStore']),
      async getUsers() {
        try {
          await this.getAllUsersAttenteStore();
          this.users = this.getAllUsersAttente;
        } catch (error) {
          console.error('Erreur lors du chargement des données :', error);
        }
      },
      async acceptUser(id_user) {
          await this.acceptUserStore(id_user);
          this.users = this.getAllUsersAttente;
      },
      async refuseUser(id_user) {
          await this.refuseUserStore(id_user);
          this.users = this.getAllUsersAttente;
      },
    },
    async mounted() {
      try {
        await this.getUsers();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
  }

</script>


<style>

</style>