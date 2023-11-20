<template>
    <div>
      <h4>Création du stand</h4>
        <form @submit.prevent="submitForm">
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
                <SelectEmplacement v-model="stand.id_emplacement" :typeZone="typeZone" required></SelectEmplacement>
            <button type="submit">Add Stand</button>
        </form>
    </div>
</template>

<script>
import SelectEmplacement from './SelectEmplacement.vue';

export default {
    components: {
        SelectEmplacement
    },
    props: {
        typeZone: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
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
        }
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


.form {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
</style>