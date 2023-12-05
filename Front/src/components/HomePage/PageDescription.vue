<template>
  <div class="container-fluid h-100 customarge" >
    <div class="row h-100">
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <img class="img" :src="image" alt="image du parcours">
      </div>
      <div class="col-lg-6 d-flex flex-column align-items-center justify-content-center" style="font-family: Arial, sans-serif">
        <h2 class="subtitle subMarge">{{translate("desc_1")}}</h2>
        <h2 class="subtitle subMarge">26 juillet 2024 : Une expérience inoubliable le long des quais de Paris</h2>
        <div style="text-align: justify; margin-left: 7%; margin-right: 7%;">
          <ul >
        <li style="margin-bottom: 5px;"><b>{{translate("desc_2")}}
        </b>{{translate("desc_3")}}</li>
        <li style="margin-bottom: 5px"><b>{{translate("desc_4")}}</b>{{translate("desc_5")}}</li>
        <li style="margin-bottom: 5px"><b>{{translate("desc_6")}}</b>{{translate("desc_7")}}</li>
        <li style="margin-bottom: 5px"><b>{{translate("desc_8")}}</b>{{translate("desc_9")}}</li>
          </ul>
        <p style="margin-bottom: 10%"><b>{{translate("desc_10")}}</b></p>

        </div>
        <div class="table-responsive">
          <table class="table">
          <thead>
          <tr>
            <th scope="col">{{ translate("desc_horaire") }}</th>
            <th scope="col">{{ translate("desc_prestation") }}</th>
            <th scope="col">{{translate("desc_lieuObservation")}}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">{{translate("desc_19h")}}</th>
            <td>{{translate("desc_19h_1")}}</td>
            <td>{{translate("desc_19h_2")}}</td>
          </tr>
          <tr>
            <th scope="row">{{translate("desc_20h30")}}</th>
            <td>{{translate("desc_20h30_1")}} </td>
            <td>{{translate("desc_20h30_2")}}</td>
          </tr>
          <tr>
            <th scope="row">{{translate("desc_21h")}}</th>
            <td >{{translate("desc_21h_1")}}</td>
            <td>{{translate("desc_21h_2")}}</td>
          </tr>
          <tr>
            <th scope="row">{{translate("desc_22h30")}}</th>
            <td>{{translate("desc_22h30_1")}}</td>
            <td>{{translate("desc_22h30_2")}}</td>
          </tr>
          <tr>
            <th scope="row">{{ translate("desc_00h") }}</th>
            <td>{{ translate("desc_00h_1") }}</td>
            <td>{{ translate("desc_00h_2") }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import image from '../../assets/HomePage/parcours.jpg';
import {translate} from "../../lang/translationService.js";

export default {
  methods: {translate},
  data() {
    return {
      image: image,
      pageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem eget dui blandit, eget ullamcorper odio interdum. Sed vel nunc ac sapien facilisis ultricies. Sed luctus nunc non dolor semper, non mattis felis bibendum. Nunc vitae ante eget tortor aliquet consectetur. Aliquam erat volutpat. Duis vel hendrerit lorem. Nullam aliquet felis eu nulla mattis, eget vehicula tortor ultricies. Aenean varius purus nec mauris tincidunt, non pharetra felis fringilla. Maecenas mattis consectetur mi, nec sollicitudin ipsum euismod a. Nullam in luctus nisl. Integer auctor, odio eget iaculis facilisis, lectus justo malesuada nisl, sed posuere metus neque nec nisi. Sed venenatis, libero in venenatis malesuada, nulla ligula aliquet nulla, vel consectetur tortor dolor nec justo. Vestibulum consequat elit ac tortor interdum, a consectetur sapien varius. Vivamus interdum, justo in tincidunt faucibus, urna ex viverra arcu, sit amet mattis libero turpis vel sapien"
    };
  },
};
</script>

<style scoped>
.customarge {
  margin-top: 10vh;
  margin-bottom: 10vh;
}

.img {
  max-width: 100%;
  height: auto;
}

.row {
  min-height: 500px;
}

.subtitle {
  margin-bottom: 20px;
}

.table-responsive {
  max-width: 100%;
  overflow-x: hidden;
}
</style>