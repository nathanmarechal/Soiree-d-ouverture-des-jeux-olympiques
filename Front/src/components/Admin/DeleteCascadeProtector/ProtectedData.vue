<template>
  <div>
    <p>{{ translate("protectedData_1") }} {{ dataType }} {{translate("protectedData_2")}} </p>
    <table class="table table-striped table-bordered">
      <tbody>
        <tr>
          <td v-for="data in dataProp" :key="random(data)">
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>  
    <p> {{translate("protectedData_3")}} {{ dataType }}.</p>
  </div>
</template>

<script>
import {translate} from "@/lang/translationService";

export default {
  props: {
    dataProp: {
      type: [Array, Object],
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
    translate,
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