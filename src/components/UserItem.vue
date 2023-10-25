<template>
  <div>
    <div>{{ user.email }}</div>
    <div>{{ user.prenom }} {{ user.nom }}</div>
    <div>{{ user.role }}</div>
    <button @click="editUser">Edit</button>
    <button @click="deleteUser">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    editUser() {
      console.log('edit user',this.user.prenom, this.user.nom);
      return 0;
    },
    deleteUser() {
      console.log('delete user',this.user.prenom, this.user.nom);
      return 0;
    },
  },
};
</script>
