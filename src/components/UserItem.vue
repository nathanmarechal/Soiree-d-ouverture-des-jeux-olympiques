<template>
  <div>
    <div>{{ user.email }}</div>
    <div>{{ user.firstName }} {{ user.lastName }}</div>
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
      console.log('edit user');
      return 0;
    },
    deleteUser() {
      console.log('delete user');
      return 0;
    },
  },
};
</script>
