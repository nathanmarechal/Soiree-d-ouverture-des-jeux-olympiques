<template>
    <div class="container" style="margin-top: 70px;">
      <h1 class="title">Liste des Roles :</h1>
      <button v-if="showAddButton" class="blue-button" @click="showAddForm">Ajouter Role</button> <br /><br />
      <role-list v-if="showRoleList" :roles="roles" @delete-role="deleteRole" @edit-role="editRole"></role-list>
      <add-role-form v-if="showAddRoleForm" :maxId="calculateMaxId()" :roles="roles" @add-role="handleAddRole" @close="closeAddForm"></add-role-form>
      <edit-role-form v-if="showEditRoleForm" :selectedRole="selectedRole" @edit-role="updateRole" @close="closeEditForm"></edit-role-form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import RoleList from '@/components/Admin/Role/RoleList.vue';
  import AddRoleForm from '@/components/Admin/Role/AddRoleForm.vue';
  import EditRoleForm from '@/components/Admin/Role/EditRoleForm.vue';
  
  export default {
    components: {
      RoleList,
      AddRoleForm,
      EditRoleForm,
    },
    data() {
      return {
        roles: [],
        showAddRoleForm: false,
        showEditRoleForm: false,
        showRoleList: true,
        showAddButton: true,
        selectedRole: null,
      };
    },
    async created() {
      try {
        this.roles = await this.getRoles();
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },
    computed: {},
    methods: {
      ...mapActions(['getRoles', 'deleteRole']),
      showAddForm() {
        this.showAddRoleForm = true;
        this.showRoleList = false;
        this.showAddButton = false;
      },
      closeAddForm() {
        this.showAddRoleForm = false;
        this.showRoleList = true;
        this.showAddButton = true;
      },
      editRole(role) {
        this.selectedRole = role;
        this.showRoleList = false;
        this.showAddButton = false;
        this.showEditRoleForm = true;
      },
      closeEditForm() {
        this.selectedRole = null;
        this.showRoleList = true;
        this.showEditRoleForm = false;
        this.showAddButton = true;
      },
      // Handle the 'add-role' event from the AddRoleForm component
      handleAddRole(role) {
        // Update your roles array or perform any other necessary actions
        this.roles.push(role);
        // Close the form
        this.closeAddForm();
      },
      calculateMaxId() {
        // Calculate maxId as the maximum id + 1
        const maxId = Math.max(...this.roles.map(role => role.id_role), 0) + 1;
        return maxId;
      },
      deleteRole(role) {
        // Update your roles array or perform any other necessary actions
        this.roles.splice(this.roles.indexOf(role), 1);
      },
      updateRole(role) {
        const index = this.roles.findIndex(r => r.id_role === role.id_role);
        this.roles.splice(index, 1, role);
        this.closeEditForm();
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .blue-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4d79ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .blue-button:hover {
    background-color: #1a53ff;
  }
  </style>
  