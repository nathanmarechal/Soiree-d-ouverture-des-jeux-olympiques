<template>
    <div class="edit-user-form">
        <h2>Modifier Utilisateur</h2>
        <form @submit.prevent="submitForm">
            <div>
                <input type="hidden" id="id" v-model="user.id_user" required>
            </div>
            <div>
                <label for="first-name">Prénom:</label>
                <input type="text" id="first-name" v-model="user.prenom" required>
            </div>
            <div>
                <label for="last-name">Nom:</label>
                <input type="text" id="last-name" v-model="user.nom" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div>
                <label for="adresse">Adresse :</label>
                <input type="text" id="adresse" v-model="user.adresse" required>
            </div>
            <div>
                <label for="code_postal">Code Postal :</label>
                <input type="text" id="code_postal" v-model="user.code_postal" required>
            </div>
            <div>
                <label for="password">Password :</label>
                <input type="text" id="password" v-model="user.password" required>
            </div>
            <div>
                <label for="role">Role:</label>
                <select id="role" v-model="user.role" required>
                    <option value="">Sélectionner un role</option>
                    <option value="admin">Admin</option>
                    <option value="prestataire">Prestataire</option>
                </select>
            </div>
            <button class="blue-button" type="btn btn-success">Sauvegarder</button>
            <router-link to="/admin/users/" class="btn btn-danger">Quitter</router-link>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['selected_user'],
    data() {
        return {
            user : {},
        };
    },
    async mounted() {
        try {
            this.user = this.selected_user;
            await this.loadData();
        } catch (error) {
            console.error('Erreur lors du chargement des données :', error);
        }
    },
    computed:{
        ...mapGetters(['getAllRoles']),
    },
    methods: {
        ...mapActions(['getRolesStore', 'updateUserStore']),
        async loadData() {
            try {
                if (this.getAllRoles.length === 0)
                    await this.getRolesStore();
            } catch (error) {
                console.error('Erreur lors du chargement des données :', error);
            }
        },
        async submitForm() {
            try {
                console.log("Données de l'utilisateur :", this.user);
                await this.updateUserStore({id : this.user.id, body : {
                    prenom: this.user.prenom,
                    nom: this.user.nom,
                    email: this.user.email,
                    adresse: this.user.adresse,
                    code_postal: this.user.code_postal,
                    password: this.user.password,
                    role: this.user.role
                }});
                await this.$router.push('/admin/users/');
            } catch (error) {
                console.error("Erreur lors de la modification de l'utilisateur :", error);
            }
        }
    },
}
</script>


<style scoped>
.edit-user-form {
    margin-top: 20px;
}

h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

label {
    margin-bottom: 5px;
}

input,
select {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

select {
    width: 100%;
}

</style>
