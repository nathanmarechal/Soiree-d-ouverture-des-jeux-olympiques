<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>id</th>
                  <th>libelle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(role, index) in roles" :key="index">
                  <td>{{ role.id_role }}</td>
                  <td>{{ role.libelle }}</td>
                  <td>
                    <button class="btn btn-info" @edit-role="editRole" @click="editRole(role)">Modifier</button>
                    <button class="btn btn-danger" @click="removeRole(role)">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { deleteRole } from "@/services/utilisateur.service";

  export default {
    props: {
      roles: {
        type: Array,
        required: true,
      },
    },
  
    methods: {
      async removeRole(role) {
        try {
          console.log("Role to delete:", role.id_role);
          // Call the deleteRole method directly
          const response = await deleteRole(role.id_role);
          this.$emit('delete-role', role);
          console.log("Role deleted successfully:", response);
        } catch (error) {
          console.error('Erreur lors de la suppression du rôle:', error);
        }
      },
      editRole(role) {
            this.$emit('edit-role', role);
        },
    },
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  