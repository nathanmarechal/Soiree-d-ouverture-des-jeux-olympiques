<template>
    <div class="edit-user-form">
        <h2>Modifier Utilisateur</h2>
        <form @submit.prevent="submitForm">
            <div>
                <input type="hidden" id="id" v-model="localUser.id" required>
            </div>
            <div>
                <label for="first-name">Prénom:</label>
                <input type="text" id="first-name" v-model="localUser.prenom" required>
            </div>
            <div>
                <label for="last-name">Nom:</label>
                <input type="text" id="last-name" v-model="localUser.nom" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="localUser.email" required>
            </div>
            <div>
                <label for="role">Role:</label>
                <select id="role" v-model="localUser.role" required>
                    <option value="">Sélectionner un rôle</option>
                    <option value="admin">Admin</option>
                    <option value="prestataire">Prestataire</option>
                </select>
            </div>
            <div v-if="localUser.stand">
                <label for="stand">Stand :</label>
                <div>
                    <p>Nom du stand: {{ localUser.stand.nom_stand }}</p>
                    <p>Date d'achat: {{ localUser.stand.date_achat }}</p>
                    <p>Prix: {{ localUser.stand.prix }}</p>
                </div>
            </div>
            <button class="blue-button" type="submit">Sauvegarder</button>
            <button class="red-button" type="button" @click="$emit('close')">Annuler</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
        roles: {
            type: Array,
            required: true,
        },
        typePresentation: {
            type: String,
            required: true,
        },
        typeZone: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localUser: JSON.parse(JSON.stringify(this.user)), // Deep copy of user
        };
    },
    methods: {
        submitForm() {
            this.$emit('update-user', this.localUser);
        },
    },
};
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

button[type='submit'] {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4d79ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

button[type='submit']:hover {
    background-color: #1a53ff;
}

.red-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.red-button:hover {
    background-color: #e60000;
}
</style>
