
<template>
  <div style="margin-top: 10%; margin-bottom:5%; " >
    <div v-if="!modif">
      <UserInfo @edit-initiated="handleEdit"/>
    </div>
    <div v-else>
      <EditUserCourantInformations @edit-finished="cancelEdit" />
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfoComponent.vue";
import EditUserCourantInformations from "@/components/EditUserCourantInformations.vue";
export default {
  data() {
    return {
      modif:false,
    }
  },
  components: {
    UserInfo,
    EditUserCourantInformations
  },
  methods: {
    handleEdit() {
      this.modif = true;
    },
    cancelEdit() {
      this.modif = false;
    }
  }
};



</script>

<style scoped>

</style>