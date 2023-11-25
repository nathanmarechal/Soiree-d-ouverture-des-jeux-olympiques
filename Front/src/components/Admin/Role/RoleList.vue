<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>libelle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(role, index) in roles" :key="index">
                                <td>{{ role.id_role }}</td>
                                <td>{{ role.libelle }}</td>
                                <td>
                                    <button class="btn btn-info" @click="editRole(index)">Modifier</button>
                                    <button class="btn btn-danger" @click="deleteRole(index)">Supprimer</button>
                                </td>
                            </tr> 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        roles: {
            type: Array,
            required: true,
        },
    },

    methods: {
        editRole(index) {
            this.$emit('edit-role', index);
        },
        deleteRole(index) {
            this.$emit('delete-role', index);
        },
    },

    created() {
        this.$store.dispatch('getRoles');
    },
}
</script>

<style scoped>
/* Your styles here */
</style>
