<template>
  <div class="d-flex justify-content-center" style="margin-top: 10vh">

    <add-user-form></add-user-form>
  </div>

</template>

<script>
import addUserForm from "../components/User/AddUserForm.vue"

export default {
  components: {
    addUserForm
  }
}
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques au composant si nécessaire */
</style>
