<template>
    <div>
        <h1>Add Stand Form</h1>
        <form @submit.prevent="submitForm">
                <div>
                        <label for="nom_stand">Nom du stand:</label><br>
                        <input type="text" id="nom_stand" v-model="stand.nom_stand" required> <br>
                </div>
                <div>
                        <label for="image_stand">Image du stand:</label><br>
                        <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required> <br>
                </div>
                <div>
                        <label for="description_stand">Description du stand:</label><br>
                        <textarea id="description_stand" v-model="stand.description_stand" required></textarea><br>
                </div>
                <SelectEmplacement v-model="stand.id_emplacement" required></SelectEmplacement>
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
