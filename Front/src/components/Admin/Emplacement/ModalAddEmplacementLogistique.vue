<template>
  <div class="d-flex flex-column gap-4">
    <h2>{{translate("legendeMap_1")}}</h2>
    <div v-for="(zone, index) in getAllZone" :key="`zone-${index}`" class="d-flex align-items-center gap-2">
      <div class="cercle" :style="{ background: zone.couleur_hexa }"></div>
      <span>{{ zone.libelle }} ({{zone.type_zone_libelle}})</span>
    </div>
    <h2>{{translate("legendeMap_2")}}</h2>
    <div v-for="(typeEmplacementLogistique, index) in getAllTypeEmplacementLogistique" :key="`typeEmplacement-${index}`" class="d-flex align-items-center gap-2">
      <img :src="getImagePath(typeEmplacementLogistique.image)" class="icon" alt="Icon">
      <span>{{ typeEmplacementLogistique.libelle }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { translate } from "../../../lang/translationService";

export default {
  props: ['modalActiveAddEmplacementLogistique', 'newEmplacementLogistique'],
  data() {
    return {
      emplacementLogistique: {
        libelle: '',
        id_type_emplacement_logistique: null,
      },
    };
  },
  computed: {
    ...mapGetters(['getAllTypeEmplacementLogistique']),
  },
  methods: {
    translate,
    ...mapActions(['createEmplacementLogistiqueStore']),
    getImagePath(imageName) {
      return require(`@/assets/Logos/${imageName}`);
    },
    closeModal() {
      this.$emit('close');
    },
    async emplacementLogistiqueCreate() {
      const emplacementData = {
        libelle: this.emplacementLogistique.libelle,
        coordonnes: this.newEmplacementLogistique.coordonnees,
        id_type_emplacement_logistique: this.emplacementLogistique.id_type_emplacement_logistique,
      };

      try {
        await this.createEmplacementLogistiqueStore(emplacementData);
        this.closeModal();
      } catch (error) {
        console.error('Error creating emplacement logistique:', error);
        // Handle errors as needed (e.g., show a notification to the user)
      }
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.modal-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

</style>
