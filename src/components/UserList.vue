<template>
    <div>
      <User v-for="user in users" :key="user.id" :user="user" />
    </div>
  </template>
  
  <script>
  import User from './UserItem.vue';
  
  export default {
    components: {
      User,
    },
    props: ['users'],
  };
  </script>
  