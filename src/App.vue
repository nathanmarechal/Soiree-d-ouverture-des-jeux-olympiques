<template>
  <div>
    <button @click="addUser">Add User</button>
    <UserList :users="users" />
  </div>
</template>

<script>
import UserList from './components/UserList.vue';
import dataTest from "./datasources/testUsers.json";
export default {
  components: {
    UserList,
  },
  data() {
    console.log(dataTest.users);
    return {
      users: dataTest.users,
    };
  },
  methods: {
    addUser() {
      console.log('add user');
    },
  },
};
</script>
