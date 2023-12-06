<template>
  <div class="container text-center my-5">
    <h1 class="display-4 border-bottom pb-2">{{ translate("slide_title") }}</h1>
  </div>
</template>

<script>
import {translate} from "../../lang/translationService";

export default {
  methods: {translate}
}
</script>

<style scoped>
h1.display-4 {
  color: #343a40;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>