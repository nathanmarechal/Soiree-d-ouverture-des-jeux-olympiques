<template>
  <form @submit.prevent="submitForm()" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="zone.libelle" id="libelle" placeholder="Libellé" class="form-control">
    </div>
    <div class="form-group">
      <label for="couleur_hexa">Couleur:</label>
      <input v-model="zone.couleur_hexa" id="couleur_hexa" type="color" class="form-control">
    </div>
    <div class="form-group">
      <label for="type_zone_libelle">Type de zone:</label>
      <select v-model="zone.id_type_zone" id="type_zone_libelle" class="form-control">
        <option v-for="type in type_zones" :key="type.id_type_zone" :value="type.id_type_zone">{{ type.libelle }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Modifier</button>
    <router-link to="/admin/zones/" class="btn btn-danger">Quitter</router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
  import { getZoneById, updateZone } from "@/services/map.service";

export default {
  props: ["id_zone"],
  data() {
    return {
      zone: {
        id_zone: null,
        libelle: null,
        couleur_hexa: null,
        id_type_zone: null,
        type_zone_libelle: null,
      },
      type_zones: [],
    };
  },
  async created() {
    try {
      this.type_zones = await this.getTypesZone();
      const zoneArray = await getZoneById(this.id_zone);
      this.zone = zoneArray.length > 0 ? zoneArray[0] : {};
      console.log("Données de la zone dans le created :", this.zone);
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  methods: {
    ...mapActions(["getTypesZone"]),
    async submitForm() {
      try {
        console.log("Données de la zone :", this.zone);
        await updateZone(this.zone.id_zone, {
          libelle: this.zone.libelle,
          couleur_hexa: this.zone.couleur_hexa,
          id_type_zone: this.zone.id_type_zone,
        });
        await this.$router.push('/admin/zones/'); // Redirect to '/admin/zones/' after successful update
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la zone :', error);
        // Handle any errors here, such as displaying a notification to the user
      }
    }

  }
};
</script>
