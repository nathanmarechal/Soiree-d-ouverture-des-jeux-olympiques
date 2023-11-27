<template>
  <div class="container-fluid h-100 " >
    <div class="row h-100">
      <h2 class="subtitle subMarge" style="padding-left: 3%">Comment profiter au maximum ?</h2>
      <div class="col-lg-4 d-flex align-items-center justify-content-center">
        <div class="lead test justi" style="margin-left: 7%">{{ CarteDescription }}
        <ul class="lead test justi" >
          <li style="margin-top: 1%">De la <b style="font-weight: bold">nourriture</b> française, mais également internationale !</li>
          <li style="margin-top: 1%">Des <b style="font-weight: bold">boissons</b> pour tous les goûts !</li>
          <li style="margin-top: 1%">Des possibilités de <b> style="font-weight: bold"transport</b> pour suivre l'évènement !</li>
          <li style="margin-top: 1%">Des <b style="font-weight: bold">activités</b> en tout genre pour ne jamais s'ennuyer !</li>
          <li style="margin-top: 1%"> De la découverte ainsi que de la promotion <b style="font-weight: bold">internationale</b> !</li>
          <li style="margin-top: 1%">Différents <b style="font-weight: bold">magasins</b> afin de ne manquer de rien !</li>
          <li style="margin-top: 1%">De nombreuses <b style="font-weight: bold">fanzones</b> pour ne rien rater de l'évènement </li>
        </ul>
        </div>
      </div>
      <div class="col-lg-8 d-flex align-items-center justify-content-center">
        <MapZone style="width: 75%; height: 100%" />
      </div>
    </div>
  </div>
</template>


<script>
import MapZone from '../Map/MapZone.vue'

export default {
  data() {
    return {
      CarteDescription: "Bienvenue à la cérémonie d'ouverture des Jeux Olympiques ! Ce moment emblématique marque le début d'un événement mondial célébré, rassemblant des athlètes et des fans de tous les horizons. Pour vous assurer une expérience inoubliable, nous avons préparé un guide complet des services disponibles sur le site. Consultez la carte interactive à droite pour localiser chaque stand et accéder directement à leurs offres spécifiques comme : "
    };
  },
  components: {
    MapZone
  }


};
</script>

<style scoped>

.subMarge {
  margin-top: 4vh;
}

.customarge {
  margin-top: 10vh;
  margin-bottom: 10vh;
  margin-left: 5vh;
}
.justi{
  text-align: justify;
}

.map-container {
  width: 95%;
  height: 95%;
}
#map {
  width: 95%;
  height: 95%;
}

</style>