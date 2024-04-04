<template>
    <div class="edit-user-form"><br><br><br>
        <h2>{{translate("edit_user_formTitle")}}</h2>
        <form @submit.prevent="submitForm">
            <div>
                <input type="hidden" id="id_user" v-model="user.id_user" required>
            </div>
            <div>
                <label for="first-name">{{translate("edit_user_form1")}}</label>
                <input type="text" id="first-name" v-model="user.prenom" required>
            </div>
            <div>
                <label for="last-name">{{translate("edit_user_form2")}}</label>
                <input type="text" id="last-name" v-model="user.nom" required>
            </div>
            <div>
                <label for="email">{{translate("edit_user_form3")}}</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div>
                <label for="adresse">{{translate("edit_user_form4")}}</label>
                <input type="text" id="adresse" v-model="user.adresse" required>
            </div>
            <div>
                <label for="commune">{{translate("edit_user_form5")}}</label>
                <input type="text" id="commune" v-model="user.commune" required>
            </div>
            <div>
                <label for="solde">{{translate("edit_user_form6")}}</label>
                <input type="text" id="solde" v-model="user.solde" required>
            </div>
            <div>
                <label for="code_postal">{{translate("edit_user_form7")}}</label>
                <input type="text" id="code_postal" v-model="user.code_postal" required>
            </div>
            <div>

                <p>{{translate("edit_user_form8")}}{{user.password}}</p>
                <label for="password">{{translate("edit_user_form9")}}</label>
                <input type="text" id="password" v-model="password" required>
            </div>
            <div>
                <label for="role">{{translate("edit_user_form10")}}</label>
                <select id="role" v-model="user.id_role" required>
                    <option value="">{{translate("edit_user_form11")}}</option>
                    <option v-for="role in getAllRoles" :key="role.id_role" :value="role.id_role">{{ role.libelle }}</option>
                </select>
            </div>
            <button class="btn btn-primary">{{translate("edit_user_form12")}}</button>
            <router-link to="/admin/users/" class="btn btn-danger">{{translate("edit_user_form13")}}</router-link>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import sha256 from "crypto-js/sha256";
import {translate} from "@/lang/translationService";

export default {
    props: ['selected_user'],
    data() {
        return {
          user : {},
          password : ""
        };
    },
    async mounted() {
        try {
            this.user = this.selected_user;
            if (this.user === undefined) {
                throw new Error("L'utilisateur n'a pas été trouvé");
            }
            await this.loadData();
        } catch (error) {
            console.error('Erreur lors du chargement des données :', error);
        }
    },
    computed:{
      ...mapGetters('roleEtDroit', ['getAllRoles']),
    },
    methods: {
      translate,
      ...mapActions('roleEtDroit', ['getRolesStore']),
      ...mapActions('user', ['updateUserStore']),
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
              var password;
              if(this.password!=="")
              {
                password = sha256(this.password).toString();
              }
              else
              {
                password = this.user.password;
              }

                await this.updateUserStore({
                    id_user: this.selected_user.id_user,
                    prenom: this.user.prenom,
                    nom: this.user.nom,
                    email: this.user.email,
                    adresse: this.user.adresse,
                    commune : this.user.commune,
                    solde : this.user.solde,
                    code_postal: this.user.code_postal,
                    password: password,
                    id_role: this.user.id_role,
                });
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
