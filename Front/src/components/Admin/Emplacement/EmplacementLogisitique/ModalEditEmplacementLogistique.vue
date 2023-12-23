<template>
  <div v-if="modalActiveEditEmplacementLogistique" class="overlay">
    <div class="modal-inner">
      <h3>{{ translate("editEmplacementLogistique_1") }}</h3>
      <table>
        <tr>
          <td>Libellé:</td>
          <td>
            <input type="text" v-model="editableEmplacement.libelle"/>
          </td>
        </tr>
        <tr>
          <td>Type d'Emplacement:</td>
          <td>
            <select v-model="editableEmplacement.id_type_emplacement_logistique">
              <option v-for="type in getAllTypeEmplacementLogistique" :key="type.id_type_emplacement_logistique" :value="type.id_type_emplacement_logistique">{{ type.libelle }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{{ translate("editEmplacementLogistique_5") }}  ({{ selectedType.libelle_unite }}):</td>
          <td>
            <input v-model="editableEmplacement.unite" type="number" />
            <span v-if="selectedType">

            </span>
          </td>
        </tr>
      </table>
      <button @click="$emit('close');" type="button" class="btn btn-success">{{ translate("editEmplacementLogistique_2") }}</button>
      <button @click="updateEmplacement" type="button" class="btn btn-primary">{{ translate("editEmplacementLogistique_3") }}</button>
      <button @click="deleteEmplacement" type="button" class="btn btn-danger">{{ translate("editEmplacementLogistique_4") }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { translate } from "../../../../lang/translationService";

export default {
  props: ['modalActiveEditEmplacementLogistique', 'selectedEmplacementLogistique'],
  data() {
    return {
      editableEmplacement: null,
    };
  },
  computed: {
    ...mapGetters(['getAllTypeEmplacementLogistique']),
    selectedType() {
      // Récupérer le type d'emplacement logistique sélectionné
      return this.getAllTypeEmplacementLogistique.find(type => type.id_type_emplacement_logistique === this.editableEmplacement.id_type_emplacement_logistique);
    },
  },
  watch: {
    selectedEmplacementLogistique: {
      handler(newVal) {
        this.editableEmplacement = {...newVal};
      },
      immediate: true
    }
  },
  methods: {
    translate,
    ...mapActions(['updateEmplacementLogistiqueStore', 'deleteEmplacementLogistiqueStore']),

    closeModal() {
      this.$emit('close');
    },

    async updateEmplacement() {
      try {
        const updateBody = {
          libelle: this.editableEmplacement.libelle,
          id_type_emplacement_logistique: this.editableEmplacement.id_type_emplacement_logistique,
          unite: this.editableEmplacement.unite,
        };

        await this.updateEmplacementLogistiqueStore({
          id: this.editableEmplacement.id_emplacement_logistique,
          body: updateBody
        });
        this.closeModal();
      } catch (error) {
        console.error('Error updating emplacement:', error);
        alert('Error updating emplacement');
      }
    },

    async deleteEmplacement() {
      try {
        await this.deleteEmplacementLogistiqueStore(this.editableEmplacement.id_emplacement_logistique);
        this.closeModal();
      } catch (error) {
        console.error('Error deleting emplacement:', error);
        alert('Error deleting emplacement');
      }
    },
  }
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

.modal-inner img {
  border-radius: 15px;
  max-width: 25vh;
  margin-bottom: 20px;
}

</style>
