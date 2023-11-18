<template>
    <div>
        <div>
            <label for="type_zone">Type Zone</label>
            <select id="type_zone" v-model="typeZone" required>
                <option value="">Sélectionner un type de zone</option>
                <option v-for="type_zone in list_zones" :key="type_zone" :value="type_zone">{{ type_zone }}</option>
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
    },
    data() {
        return {
            typeZone: '',
            list_zones: '',
        };
    },
    methods: {
        submitForm() {
            const newEmplacement = {
                type_zone: this.typeZone,
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
