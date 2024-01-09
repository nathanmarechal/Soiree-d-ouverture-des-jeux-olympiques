<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>{{translate("waitingUsers_1")}}</h1>
          <div class="alert alert-success" role="alert" v-if="users.length === 0">
            {{translate("waitingUsers_2")}}
          </div>
          <div v-else>
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">{{translate("waitingUsers_3")}}</th>
              <th scope="col">{{translate("waitingUsers_4")}}</th>
              <th scope="col">{{translate("waitingUsers_5")}}</th>
              <th scope="col">{{translate("waitingUsers_6")}}</th>
              <th scope="col">{{translate("waitingUsers_7")}}</th>
              <th scope="col">{{translate("waitingUsers_8")}}</th>
              <th scope="col">{{translate("waitingUsers_9")}}</th>
              <th scope="col">{{translate("waitingUsers_10")}}</th>
              <th scope="col">{{translate("waitingUsers_11")}}</th>
              <th scope="col">{{translate("waitingUsers_12")}}</th>
              <th scope="col">{{translate("waitingUsers_13")}}</th>
              <th scope="col">{{translate("waitingUsers_14")}}</th>
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
                <button class="btn btn-success" @click="acceptUser(user.id_user)">{{translate("waitingUsers_15")}}</button>
                <button class="btn btn-danger" @click="refuseUser(user.id_user)">{{translate("waitingUsers_16")}}</button>
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
  import {translate} from "../lang/translationService";

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
      translate,
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