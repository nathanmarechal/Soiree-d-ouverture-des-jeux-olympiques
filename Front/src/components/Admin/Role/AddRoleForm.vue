<template>
  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
    <!-- Removed the input field for maxId -->
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="role.libelle" id="libelle" placeholder="Libellé" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-success">Add Role</button>
    <button type="button" @click="$emit('close')" class="btn btn-danger">Cancel</button>
  </form>
</template>

<script>
import { createRole } from "@/services/utilisateur.service";

export default {
  props: {
    maxId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      role: {
        id_role: this.maxId,
        libelle: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        console.log("Max ID from parent:", this.maxId);
        console.log("Role data:", this.role);
        const response = await createRole(this.role);
        console.log("Role added successfully:", response);
        this.$emit('add-role', this.role);
      } catch (error) {
        console.error("Erreur lors de l'ajout du rôle:", error);
        // Add logic to display an error message to the user
      }
    }
  }
};
</script>
