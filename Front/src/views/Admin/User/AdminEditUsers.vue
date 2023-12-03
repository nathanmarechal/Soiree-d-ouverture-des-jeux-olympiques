<template>
  <div>
    <div v-if="true" class="container" style="margin-top: 70px;">
        <edit-user-form></edit-user-form>
    </div>
    <div v-else>
      {{ error404() }}
    </div>
  </div>
</template>

<script>
import EditUserForm from '@/components/Admin/User/EditUserForm.vue';

export default {
  components: {
    EditUserForm
  },
  methods: {
    error404() {
      this.$router.push("/404");
    },
  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  margin-bottom: 5vh;
}
</style>