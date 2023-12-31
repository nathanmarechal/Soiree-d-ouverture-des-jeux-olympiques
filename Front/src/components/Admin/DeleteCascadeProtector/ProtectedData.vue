<template>
  <div>
    <p>Le {{ dataType }} suivant : </p>
    <table class="table table-striped table-bordered">
      <tbody>
        <tr>
          <td v-for="data in dataProp" :key="random(data)">
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
  methods: {
    random(data) {
      //generate a random number to be used as key so that vue doesn't complain
      for(var value in data)
        if (!value.isNaN ) {
          return Math.random() * 10000+value;}
      return Math.random() * 10000;
    }
  }

}
</script>

<style>

</style>