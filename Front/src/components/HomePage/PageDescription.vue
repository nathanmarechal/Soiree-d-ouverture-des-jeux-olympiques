<template>
  <div class="container-fluid h-100 customarge" >
    <div class="row h-100">
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <img class="img" :src="image" alt="image du parcours">
      </div>
      <div class="col-lg-6 d-flex flex-column align-items-center justify-content-center" style="font-family: Arial, sans-serif">
        <h2 class="subtitle subMarge">Une expérience inoubliable le long des quais de Paris</h2>
        <div style="text-align: justify; margin-left: 7%; margin-right: 7%;">
          <ul >
        <li style="margin-bottom: 5px;"><b>Un Voyage à Travers l'Histoire et la Culture : </b>De l'Hôtel de Ville aux jardins des Tuileries, chaque site choisi offre un aperçu de l'histoire et de la beauté de Paris. Ces lieux ne sont pas seulement des fonds scéniques, mais des participants actifs à la célébration.</li>
        <li style="margin-bottom: 5px"><b>Des Moments Inoubliables : </b> La parade des athlètes et la présentation de la flamme olympique s'entremêlent avec des spectacles culturels vibrants, offrant une immersion totale dans l'esprit des Jeux.</li>
        <li style="margin-bottom: 5px"><b>Feu d'Artifice et Concerts :  </b>L'apogée de la soirée se trouve près de la Tour Eiffel avec des concerts et un feu d'artifice spectaculaire. Constituant le véritable départ des Jeux.</li>
        <li style="margin-bottom: 5px"><b>Navigation Facilitée : </b>Notre carte interactive (trouvable en bas de la page) est conçue pour vous guider à travers ces site, et vous fournit toutes les clés pour passer une formidable soirée.</li>
          </ul>
        <p style="margin-bottom: 10%"><b>Ces Jeux Olympiques à Paris ne sont pas seulement un événement sportif, mais également une célébration culturelle.</b></p>

        </div>
        <div class="table-responsive">
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
            <td>Parade des athlètes / présentation de la flamme olympique</td>
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
            <td>Quais Tour Eiffel / Trocadéro / Iena</td>
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