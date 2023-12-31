<template>
  <div>
    <div v-if="dataType === 'user'">
      <UserList :isProtectorDelete="true" :filterProtector="dataProp" @NeedProtection="handleNeedProtection"/>
    </div>
    <div v-if="dataType === 'role'">
      <RoleList :isProtectorDelete="true" :filterProtector="dataProp" @NeedProtection="handleNeedProtection"/>
    </div>
    <div v-if="dataType === 'stand'">
      {{ previousDataId }}
      <StandList :isProtectorDelete="true" :previousDataId="previousDataId" :filterProtector="dataProp" :previousDataType="previousDataType" :isLevel2="isLevel2" @goBack="handleGoBack" @NeedProtection="handleNeedProtection"/>
    </div>
    <div v-if="dataType === 'area'">
      <EditAreas :isProtectorDelete="true" :filterProtector="dataProp" @NeedProtection="handleNeedProtection"/>
    </div>
    
  </div>
</template>

<script>
import RoleList from '@/components/Admin/Role/RoleList.vue';
import UserList from '@/components/Admin/User/UserList.vue';
import StandList from '@/components/Admin/Stand/StandList.vue';
import EditAreas from '@/components/Admin/Emplacement/EditAreas.vue';

export default {
  components: {
    RoleList,
    UserList,
    StandList,
    EditAreas,
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
    previousDataType: {
      type: String,
      required: false,
      default: () => null,
    },
    isLevel2: {
      type: Boolean,
      required: false,
      default: false,
    },
    previousDataId: {
      type: Number,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleNeedProtection(data) {
      this.$emit('NeedProtection', data);
    },
    handleGoBack(data) {
      this.$emit('goBack', data);
    },
  }
}
</script>

<style>

</style>