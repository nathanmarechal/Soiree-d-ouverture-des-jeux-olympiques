<template>
    <div>
        <form @submit.prevent="editRole">
            <label for="libelle">Libellé:</label><br>
            <input type="text" id="libelle" v-model="selectedRole.libelle" required><br>
            <button type="submit">Edit Role</button>
            <button type="button" class="btn btn-danger" @click="$emit('close')">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        role: {
            type: Object,
            required: true
        }
    },
    methods: {
        editRole() {
            console.log(this.role);
            this.$emit('edit-role', this.role);
        }
    }
};
</script>
