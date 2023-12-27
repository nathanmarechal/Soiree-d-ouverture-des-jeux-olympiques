<template>
  <div>
    <div v-if="dataType === 'user'">
      <UserList :isProtectorDelete="true" :filterProtector="dataProp"/>
    </div>
    <div v-if="dataType === 'role'">
      <RoleList :isProtectorDelete="true" :filterProtector="dataProp"/>
    </div>
  </div>
</template>

<script>
import RoleList from '@/components/Admin/Role/RoleList.vue';
import UserList from '@/components/Admin/User/UserList.vue';

export default {
  components: {
    RoleList,
    UserList
  },
  props: {
    dataProp: {
      type: Array,
      required: true,
    },
    dataType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },

}
</script>

<style>

</style>