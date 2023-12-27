<template>
  <div>
    <p>Le {{ dataType }} suivant : </p>
    <table class="table table-striped table-bordered">
      <tbody>
        <tr>
          <td v-for="data in dataProp" :key="data[0]">
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>  
    <p>est lié à d'autres données, veuillez les supprimer avant de supprimer ce {{ dataType }}.</p>
  </div>
</template>

<script>
export default {
  props: {
    dataProp: {
      type: Object,
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