 <template>
  <div v-if="modalActiveAddEmplacementLogistique" class="overlay">
    <div class="modal-inner">
      <h3>{{ translate("addEmplacementLogistique_1") }}</h3>
      <table>
        <tr>
          <th>{{ translate("addEmplacementLogistique_2") }}</th>
          <td><input v-model="emplacementLogistique.libelle" type="text" /></td>
        </tr>
        <tr>
          <th>{{ translate("addEmplacementLogistique_3") }}</th>
          <td>{{ newEmplacementLogistique.coordonnees }}</td>
        </tr>
        <tr>
          <th>{{ translate("addEmplacementLogistique_4") }}</th>
          <td>
            <select v-model="emplacementLogistique.id_type_emplacement_logistique">
              <option v-for="type in getAllTypeEmplacementLogistique" :key="type.id_type_emplacement_logistique" :value="type.id_type_emplacement_logistique">
                {{ type.libelle }}
              </option>
            </select>
          </td>
        </tr>
        <tr v-if="selectedType">
          <th>{{ translate("addEmplacementLogistique_5") }} ({{ selectedType.libelle_unite }})</th>
            <td>
              <input v-model="emplacementLogistique.unite" type="number" />
            </td>
        </tr>
      </table>
      <button @click="emplacementLogistiqueCreate()" class="btn btn-success">Ajouter</button>
      <button @click="closeModal" class="btn btn-danger">Fermer</button>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { translate } from "../../../../lang/translationService";

export default {
  props: ['modalActiveAddEmplacementLogistique', 'newEmplacementLogistique'],
  data() {
    return {
      emplacementLogistique: {
        libelle: '',
        id_type_emplacement_logistique: null,
        unite: null,
      },
    };
  },
  computed: {
    //...mapGetters(['getAllTypeEmplacementLogistique']),
    ...mapGetters('emplacementLogistiqueEtType', ['getAllTypeEmplacementLogistique']),
    selectedType() {
      const typeId = this.emplacementLogistique.id_type_emplacement_logistique;
      return this.getAllTypeEmplacementLogistique.find(type => type.id_type_emplacement_logistique === typeId);
    },
  },
  methods: {
    translate,
    //...mapActions(['createEmplacementLogistiqueStore']),
    ...mapActions('emplacementLogistiqueEtType', ['createEmplacementLogistiqueStore']),

    closeModal() {
      this.$emit('close');
    },
    async emplacementLogistiqueCreate() {
      const emplacementData = {
        libelle: this.emplacementLogistique.libelle,
        coordonnes: this.newEmplacementLogistique.coordonnees,
        id_type_emplacement_logistique: this.emplacementLogistique.id_type_emplacement_logistique,
        unite: this.emplacementLogistique.unite,
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
