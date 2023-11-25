<template>
    <div class="container" style="margin-top: 70px;">
        <h1 class="title">Liste des Roles :</h1>
        <button v-if="showAddButton" class="blue-button" @click="showAddForm">Ajouter Role</button> <br><br>
        <role-list v-if="showRoleList" :roles="roles" @edit-role="editRole" @delete-role="deleteRole"></role-list>
        <add-role-form v-if="showAddRoleForm" :roles="roles" @add-role="addRole" @close="closeAddForm"></add-role-form>
        <edit-role-form v-if="showEditRoleForm" :selectedRole="selectedRole" @update-role="updateRole" @close="closeEditForm"></edit-role-form>
    </div>
</template>

<script>
import { mapActions} from 'vuex';
import RoleList from '../components/Admin/Role/RoleList.vue';
import AddRoleForm from '../components/Admin/Role/AddRoleForm.vue';
import EditRoleForm from '../components/Admin/Role/EditRoleForm.vue';

export default {
    components: {
        RoleList,
        AddRoleForm,
        EditRoleForm
    },
    data() {
        return {
            roles: [],
            showAddRoleForm: false,
            showEditRoleForm: false,
            showRoleList: true,
            showAddButton: true,
            selectedRole: null
        };
    },
    async created() {
      try {
        this.roles = await this.getRoles();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    computed: {
    },
    methods: {
        ...mapActions(['getRoles']),
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
            this.showEditRoleForm = true;
        },
        closeEditForm() {
            this.selectedRole = null;
            this.showRoleList = true;
            this.showEditRoleForm = false;
        },
        addRole() {
            // Add role logic here
        },
        updateRole() {
            // Update role logic here
        },
        deleteRole() {
            // Delete role logic here
        }
    }
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
