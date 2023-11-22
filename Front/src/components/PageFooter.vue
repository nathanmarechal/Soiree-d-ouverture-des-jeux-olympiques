<template>
  <footer class="bg-dark text-custom py-2">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="logo">
            <img src="../assets/Logos/logovecto.svg" alt="Logo SAE_S3" />
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
            <li><a href="#" class="text-custom">À propos</a></li>
            <li><a href="#" class="text-custom">Services</a></li>
            <li><a href="#" class="text-custom">Projets</a></li>
            <li><a href="#" class="text-custom">Contact</a></li>
          </ul>
        </div>
        <div class="col-md-3 text-right custom-margin">
          <p class="mb-0">&copy; {{ currentYear }} SAE_S3. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
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
