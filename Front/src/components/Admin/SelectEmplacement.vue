<template>
    <div>
        <div>
            <label for="type_zone">Type Zone</label>
            <select id="type_zone" v-model="emplacement.typeZone" required>
                <option value="">Sélectionner un type de zone</option>
                <option v-for="typeZone in typeZone" :key="typeZone" :value="typeZone.id_type_zone">{{ typeZone.libelle }}</option>
            </select>
        </div>
        <div class="map-container">
            <div class="map-placeholder">
                <span>WIP MAP</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        emplacements: {
            type: Array,
            required: true,
        },
        typeZone: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            emplacement: {
                typeZone: '',
            },
        };
    },
    methods: {
        submitForm() {
            const newEmplacement = {
                typeZone: this.typeZone,
            };
            this.$emit('add-emplacement', newEmplacement);
        },
    },
};
</script>

<style scoped>
.map-container {
    width: 100%;
    height: 300px;
    border: 1px solid black;
    margin-top: 20px;
}

</style>
