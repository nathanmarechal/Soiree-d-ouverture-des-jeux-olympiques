<template>
    <div >
      <h4>Création du stand</h4>
        <form @submit.prevent="submitForm" class="stand">
                <div class="form">
                        <label for="nom_stand">Nom du stand</label>
                        <input type="text" id="nom_stand" v-model="stand.nom_stand" required>
                </div>
                <div class="form">
                        <label for="image_stand">Image du stand</label><br>
                        <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
                </div>
                <div  class="d-flex flex-column">
                        <label for="description_stand">Description du stand:</label>
                  <textarea id="description_stand" v-model="stand.description_stand" required class="w-100"></textarea>
                </div>

              <map-sign-up-pre-view style="width: 100%; height: 25vh;"> </map-sign-up-pre-view>

              <div class="d-flex justify-content-center"> <!-- Flexbox for centering -->
                <button type="button" class="btn btn-success" @click="toggleSelectEmplacementModal">Reserver un emplacement</button>
              </div>
               <SelectEmplacement @close="toggleSelectEmplacementModal"  :showSelectEmplacementModal="showSelectEmplacementModal"></SelectEmplacement>
          <button type="submit">Add Stand</button>
        </form>
    </div>
</template>

<script>
import SelectEmplacement from './SelectEmplacement.vue';
import MapSignUpPreView from '../User/MapSignUpPreView.vue'

import {mapGetters} from 'vuex';

export default {
    components: {
        SelectEmplacement,
        MapSignUpPreView
    },

    data() {
        return {
          showSelectEmplacementModal: false,
          stand: {
                nom_stand: '',
                image_stand: null,
                description_stand: '',
                date_achat: 'WIP',
                prix: 'WIP',
                id_emplacement: 'WIP'
            }
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.stand.image_stand = file;
        },
        submitForm() {
            // Perform form submission logic here
            console.log(this.stand);
        },

      toggleSelectEmplacementModal() {
        this.showSelectEmplacementModal = !this.showSelectEmplacementModal;
      }
    },

  computed: {
    //...mapGetters(['getAreas', 'getSelectedZone', 'getSelectedType']),
    ...mapGetters([
      'getAreaSelectedForStand',
    ]),
  },
    watch: {
      getAreaSelectedForStand: 'toggleSelectEmplacementModal',
    }
};
</script>

<style scopped>
button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4d79ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}


input, select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.stand{
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
</style>