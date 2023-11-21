<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <div ><img  class="img" :src="image" alt="image du parcours"></div>
      </div>
      <div class="col-lg-6 d-flex flex-column align-items-center justify-content-center">
        <h2 class="subtitle">Une cérémonie sur l'eau : accès gratuit</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">horaire</th>
            <th scope="col">prestation</th>
            <th scope="col">lieu d'observation</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">19h</th>
            <td>Discours, Parade des athlètes et présentation de la flamme olympique</td>
            <td>Quais Notre-Dame / Hôtel de ville</td>
          </tr>
          <tr>
            <th scope="row">20h30</th>
            <td>Défilé de mode olympique </td>
            <td>Quais Louvre</td>
          </tr>
          <tr>
            <th scope="row">21h</th>
            <td >Spectacles culturels internationaux</td>
            <td>Quais Tuileries</td>
          </tr>
          <tr>
            <th scope="row">22h30</th>
            <td>Spectacles culturels français</td>
            <td>Quais grand palais / Invalides</td>
          </tr>
          <tr>
            <th scope="row">00h</th>
            <td >Concerts et feux d'artifice</td>
            <td>Quais Tour Eiffel / Trocadéro / Pont d'Iena</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import image from '../../assets/HomePage/parcours.jpg';

export default {
  data() {
    return {
      image: image,
      pageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem eget dui blandit, eget ullamcorper odio interdum. Sed vel nunc ac sapien facilisis ultricies. Sed luctus nunc non dolor semper, non mattis felis bibendum. Nunc vitae ante eget tortor aliquet consectetur. Aliquam erat volutpat. Duis vel hendrerit lorem. Nullam aliquet felis eu nulla mattis, eget vehicula tortor ultricies. Aenean varius purus nec mauris tincidunt, non pharetra felis fringilla. Maecenas mattis consectetur mi, nec sollicitudin ipsum euismod a. Nullam in luctus nisl. Integer auctor, odio eget iaculis facilisis, lectus justo malesuada nisl, sed posuere metus neque nec nisi. Sed venenatis, libero in venenatis malesuada, nulla ligula aliquet nulla, vel consectetur tortor dolor nec justo. Vestibulum consequat elit ac tortor interdum, a consectetur sapien varius. Vivamus interdum, justo in tincidunt faucibus, urna ex viverra arcu, sit amet mattis libero turpis vel sapien"
    };
  },
};
</script>

<style scoped>
.justi{
  text-align: justify;
}

.img {
  width: 100%;
  height: 100%;
}
.row {
  min-height: 500px;
}
.subtitle {
  margin-bottom: 20px;
}
</style>