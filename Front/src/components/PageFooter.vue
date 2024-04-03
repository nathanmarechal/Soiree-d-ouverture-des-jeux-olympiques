<template>
  <footer class="footer bg-dark text-custom py-2">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="logo">
            <img :src="require('@/assets/paris_2024_logo.svg')" alt="Logo SAE_S3" />
          </div>
        </div>
        <div class="col-md-3">
          <ul class="list-unstyled mb-0">
            <li>Victor VIEUX-MELCHIOR</li>
            <li>Mathias NOTTER</li>
            <li>Timon DUBREUIL</li>
            <li>Thomas CHEVALIER</li>
            <li>Nathan MARECHAL</li>
          </ul>
        </div>
        <div class="col-md-3">
          <ul class="list-unstyled mb-0 ">
            <li><a href="#" class="text-custom">{{translate("footer_1")}}</a></li>
            <li><a href="https://www.paris2024.org/fr/" class="text-custom">{{translate("footer_2")}}</a></li>
            <li><a href="https://github.com/nathanmarechal/Soiree-d-ouverture-des-jeux-olympiques" class="text-custom">{{ translate("footer_3") }}</a></li>
            <li><a href="https://github.com/nathanmarechal/" class="text-custom">{{translate("footer_4")}}</a></li>
          </ul>
        </div>
        <div class="col-md-3 text-right custom-margin">
          <p class="mb-0">&copy; {{ currentYear }} SAE_S3. {{translate("footer_5")}}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {translate} from "../lang/translationService";

export default {
  name: "FooterComponent",
  methods: {translate},
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>


.text-custom {
  color: #D8C17B !important;
}

.custom-margin {
  margin-top: 3% !important;
}

.mb-0{
  margin-top: 15% !important;
}

h6 {
  font-size: 0.9rem;
  margin-bottom: 10px;
}



</style>
