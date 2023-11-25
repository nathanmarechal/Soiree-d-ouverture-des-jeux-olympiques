<template>
  <div>
    <form @submit.prevent="addRole">
      <label for="libelle">Libellé:</label><br>
      <input type="text" id="libelle" v-model="role.libelle" required><br>
      <button type="submit">Add Role</button><button type="btn btn-danger" @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: {
        id_role: '',
        libelle: ''
      }
    };
  },
  methods: {
    addRole() {
      console.log(this.role);
      this.$emit('add-role', this.role);
    }
  }
};
</script>
