<template>
  <form @submit.prevent="editRole" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="role.libelle" id="libelle" placeholder="Libellé" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-success">Modifier</button>
    <button type="button" class="btn btn-danger" @click="$emit('close')">Quitter</button>
  </form>
</template>

<script>
// Import the updateRole method from the service
import { updateRole } from "@/services/utilisateur.service";

export default {
  props: {
    selectedRole: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      role: this.selectedRole,
    };
  },
  methods: {
    async editRole() {
      try {
        console.log("Données du rôle :", this.role);

        // Call the updateRole method with this.role instead of this.selectedRole
        await updateRole(this.role);        
        this.$emit('edit-role', this.role);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    },
  },
};
</script>
