import {
    acceptUser,
    createUser,
     deleteUser,
    getAllUsers, getAllUsersAttente,
    refuseUser, registerClient, registerPrestataire, updateSolde, updateUser, updateUserCourantWoPassword
} from "@/services/utilisateur.service";
import {
    addCommande,
    getCommandesPrestataires,
    getCommandeUserCourant, getLigneCommandeBycommandeId,
    getScheduleByUserId, setEtatLigneCommandeExterieur
} from "@/services/commande.service";
import {
    addPrestationToPanierUser,
    deletePrestationFromPanierUser,
    getPanierUserCourant, updateQuantityInPanier
} from "@/services/panier.service";

export default {
    namespaced: true,
    state: {
        userCourant: {
            "session_id": null,
            "id_user": null,
            "nom": null,
            "email": null,
            "prenom": null,
            "solde": null,
            "code_postal": null,
            "adresse": null,
            "commune": null,
            "panier":  [],
            "droits": [],
            "schedule": [],
            "commandes" : [{
                "id_commande": null,
                "date_commande": null,
                "id_etat_commande": null,
                "prix_total": null,
                "nbr_presta": null,
                "libelle": null,
                "lignes_commande" : [{
                    "id_commande" : null,
                    "prestation_libelle" : null,
                    "id_presta" : null,
                    "id_creneau": null,
                    "quantite": null,
                    "creneau": null,
                    "prix": null,
                    "image": null,
                    "id_type_prestation": null,
                    "type_prestation_libelle": null,
                    "id_etat_commande":null,
                    "etat_libelle":null
                }]
            }],
            "id_role": null,
            "id_stand" : null,
        },
        users : [],

        isLoginOpen: false,
        isUserConnected: false,

        provenance : null,

        commandesPrestataire : [],

        usersAttente: [],
        standAttente: [],


        searchQuery: '',


        lang:"fr"

    },
    getters: {
        getSessionId: state => state.userCourant.session_id,
        getUserId: state => state.userCourant.id_user,
        getStandId: state => state.userCourant.id_stand,

        getAllUsers : state => state.users,
        getAllUsersAttente : state => state.usersAttente,
        getIdUserCourant: state => state.userCourant.id_user,
        getProvenance : state => state.provenance,
        getCurrentUser: state => state.userCourant,
        getSchedule: state => state.userCourant.schedule,


        getPanierUserCourant : state => state.userCourant.panier,
        getCommandeUserCourantGetters : state => state.userCourant.commandes,
        getLigneCommandeBycommandeId : state => state.userCourant.commandes.lignes_commande,


        getCommandeById: (state) => (id) => {
            return state.userCourant.commandes.find(commande => commande.id_commande === id);
        },


        getCommandePrestataire : state => state.commandesPrestataire,
        getSearchQuery: state => state.searchQuery,
        isLoginOpen: state => state.isLoginOpen,
        isUserConnected: state => state.isUserConnected,
        getLang: state=> state.lang,

    },
    mutations: {
        SET_USERS(state, users) {
            state.users.splice(0)
            users.forEach(p => state.users.push(p))
        },


        SET_USERS_ATTENTE(state, usersAttente) {
            state.usersAttente = usersAttente;
        },


        CREATE_USER_ATTENTE(state, usersAttente) {
            state.usersAttente.push(usersAttente);
        },


        ACCEPT_USER_DELETE(state, id) {
            let user = state.usersAttente.find(user => user.id_user === id);
            let id_stand = state.standAttente.find(stand => stand.id_stand === user.id_user)
            state.usersAttente = state.usersAttente.filter(user => user.id_user !== id);
            state.standAttente = state.standAttente.filter(stand => stand.id_stand !== id_stand);
        },


        ACCEPT_USER_ADD({state}, data) {
            state.users.push(data.userAccept)
        },


        REFUSE_USER(state, id) {
            state.usersAttente = state.usersAttente.filter(user => user.id_user !== id);
        },

        SET_PROVENANCE(state, provenance) {
            state.provenance = provenance;
        },


        SET_CURRENT_USER(state, users) {
            state.userCourant = users;
        },


        SET_PANIER_USER_COURANT(state, panier) {
            state.userCourant.panier = panier;
        },


        ADD_COMMANDES_USER_COURANT(state, id_commande) {
            console.log("ADD_COMMANDES_USER_COURANT " + id_commande);

        },


        SET_DROITS_USER_COURANT(state, droits) {
            state.userCourant.droits = droits;
        },


        SET_LIGNE_COMMANDE(state, { id_commande, ligne_commande }) {
            let commande = state.userCourant.commandes.find(c => c.id_commande === id_commande);
            if (commande) {
                commande.lignes_commande = ligne_commande;
            }
        },


        DELETE_PRESTATION_FROM_PANIER_USER_COURANT(state, payload) {
            state.userCourant.panier = state.userCourant.panier.filter(item =>
                !(item.id_prestation === payload.id_prestation && item.id_creneau === payload.id_creneau));
        },

        UPDATE_PRESTATION_QUANTITY_IN_PANIER(state, { id_user, id_prestation, quantite, id_creneau }) {
            state.userCourant.panier = state.userCourant.panier.map(item => {
                if (item.id_user === id_user && item.id_prestation === Number(id_prestation) && item.id_creneau === id_creneau) {
                    return { ...item, quantite: quantite };
                }
                return item;
            });
        },

        ADD_PRESTATION_TO_PANIER_USER_COURANT(state, id_user, id_prestation, quantite, id_creneau) {
            let item = state.userCourant.panier.find(item => item.id_prestation === id_prestation && item.id_creneau === id_creneau);

            if (item) {
                item.quantite += quantite;
            } else {
                state.userCourant.panier.push({"id_user" : id_user, "id_prestation" : id_prestation, "quantite" : quantite, "id_creneau": id_creneau});
            }
        },

        SET_COMMANDES_USER_COURANT(state, commandes) {
            state.userCourant.commandes = commandes;
        },


        SET_IS_USER_CONNECTED(state, value) {
            state.isUserConnected = value;
        },


        SET_LOGIN_MODAL(state, value) {
            state.isLoginOpen = value;
        },

        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query;
        },

        CREATE_USER(state, payload) {
            state.users.push(payload);
        },

        DELETE_USER(state, id) {
            state.users = state.users.filter(item => item.id_user !== id);
        },

        UPDATE_USER(state, payload) {
            state.users = state.users.map(item => {
                if (item.id_user === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_SOLDE(state, newsolde) {
            state.userCourant.solde = parseFloat(newsolde);
        },

        UPDATE_NOM(state, nom) {
            state.userCourant.nom = nom;
        },

        UPDATE_PRENOM(state, prenom) {
            state.userCourant.prenom = prenom;
        },

        UPDATE_EMAIL(state, email) {
            state.userCourant.email = email;
        },

        SET_LANG(state,lang){
            state.lang = lang;
        },

        SET_ETAT_LIGNE_COMMANDE_EXTERIEUR(state, { id_commande, id_prestation, id_creneau}) {
            console.log("SET_ETAT_LIGNE_COMMANDE_EXTERIEUR " + id_commande + " " + id_prestation + " " + id_creneau);
        },

        UPDATE_USER_WO_PASSWORD(state, payload) {
            state.userCourant.nom = payload.nom;
            state.userCourant.prenom = payload.prenom;
            state.userCourant.email = payload.email;
            state.userCourant.adresse = payload.adresse;
            state.userCourant.code_postal = payload.code_postal;
            state.userCourant.commune = payload.commune;
        },


        SET_SCHEDULE(state, schedule) {
            state.userCourant.schedule = schedule;
        },


        ADD_SCHEDULE(state, schedule) {
            const index = state.userCourant.schedule.findIndex(item => item.id_creneau > schedule.id_creneau);


            if (index === -1) {
                state.userCourant.schedule.push(schedule);
            } else {
                state.userCourant.schedule.splice(index, 0, schedule);
            }
        },


        SET_COMMANDS_PRESTATAIRE(state, commandesPrestataire) {
            state.commandesPrestataire = commandesPrestataire;
        },


    },


    actions: {

//-----------------------------------------------------------------Panier-----------------------------------------------------------------------//

        async getPanierUserCourantStore({commit, state}){
            try {
                const session_id = state.userCourant.session_id
                const panier = await getPanierUserCourant(session_id);
                commit('SET_PANIER_USER_COURANT', panier);
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },


        async updateQuantityInPanierStore({commit, state}, {id_user, id_prestation, id_creneau , quantite}) {
            try {
                const session_id = state.userCourant.session_id
                await updateQuantityInPanier(session_id, {id_prestation, id_creneau , quantite});
                commit('UPDATE_PRESTATION_QUANTITY_IN_PANIER', {id_user, id_prestation, id_creneau , quantite});
            }
            catch (error) {
                console.error('Error updating panier:', error);
            }
        },

        async addPrestationToPanierUserCourantStore({commit, state},{id_user, id_prestation, quantite, id_creneau}){
            try {
                const session_id = state.userCourant.session_id
                await addPrestationToPanierUser(session_id, id_prestation, quantite, id_creneau);
                commit('ADD_PRESTATION_TO_PANIER_USER_COURANT', id_user, id_prestation, quantite, id_creneau);
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },


        async deletePrestationFromPanierUserCourantStore({ commit, state },{id_prestation, id_creneau}){
            try {
                const session_id = state.userCourant.session_id
                await deletePrestationFromPanierUser( session_id, id_prestation, id_creneau);
                commit('DELETE_PRESTATION_FROM_PANIER_USER_COURANT', {id_prestation, id_creneau,});
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },

//-------------------------------------------------------------------Commande--------------------------------------------------------------------------//

        async getCommandeUserCourantStore({commit, state}){
            try {
                const session_id = state.userCourant.session_id
                const commandes = await getCommandeUserCourant(session_id);
                commit('SET_COMMANDES_USER_COURANT', commandes);
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

        async getCommandesPrestataireStore({commit, state}){
            try {
                const session_id = state.userCourant.session_id
                const commandes = await getCommandesPrestataires(session_id);
                commit('SET_COMMANDS_PRESTATAIRE', commandes);
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

        async addCommandeFromPanierStore({commit, state}){
            try {
                const session_id = state.userCourant.session_id
                const lastinstert = await addCommande(session_id);
                commit('ADD_COMMANDES_USER_COURANT', lastinstert);
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

        async setEtatLigneCommandeExterieurStore({ commit }, { id_commande, id_prestation, id_creneau}) {
            try {
                await setEtatLigneCommandeExterieur({ id_commande, id_prestation, id_creneau});
                commit('SET_ETAT_LIGNE_COMMANDE_EXTERIEUR', { id_commande, id_prestation, id_creneau});
            } catch (err) {
                console.error("Error in setEtatLigneCommandeExterieurStore():", err);
            }
        },

        async getLigneCommandebyIdCommandeStore({commit, state}, id_commande){
            try {
                const session_id = state.userCourant.session_id
                const ligne_commande = await getLigneCommandeBycommandeId(id_commande, session_id);
                commit('SET_LIGNE_COMMANDE', { id_commande, ligne_commande });
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

//-----------------------------------------------------------------Schedule-----------------------------------------------------------------------//


        async getScheduleByUserIdStore({commit, state}){
            try {
                const session_id = state.userCourant.session_id
                const schedule = await getScheduleByUserId(session_id);
                commit('SET_SCHEDULE', schedule);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        },

//-----------------------------------------------------------------User-----------------------------------------------------------------------//

        async getUsersStore({ commit, state }) {
            try {
                const result = await getAllUsers(state.userCourant.session_id);
                if (Array.isArray(result)) {
                    commit('SET_USERS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getUsersStore():", err);
            }
        },

        async getAllUsersAttenteStore({ commit, state }) {
            try {
                const usersAttente = await getAllUsersAttente(state.userCourant.session_id);
                commit('SET_USERS_ATTENTE', usersAttente);
            } catch (error) {
                console.error('Error fetching creneau:', error);
            }
        },

        async updateUserCourantWoPasswordStore({ commit, state}, {id_user, nom, prenom, email, adresse, code_postal, commune}) {
            try {
                let session_id = state.userCourant.session_id
                await updateUserCourantWoPassword( session_id, {nom, prenom, email, adresse, code_postal, commune});
                commit('UPDATE_USER_WO_PASSWORD', {id_user, nom, prenom, email, adresse, code_postal, commune});
            } catch (err) {
                console.error("Error in updateNomStore():", err);
            }
        },


        async updateSoldeStore({ commit, state }, {solde}) {
            try {
                const session_id = state.userCourant.session_id
                await updateSolde(session_id, solde);
                commit('UPDATE_SOLDE', solde);
            } catch (err) {
                console.error("Error in updateSoldeStore():", err);
            }
        },

        async acceptUserStore({ commit, state, rootState }, id) {
            try {
                let result = await acceptUser(id,state.userCourant.session_id);
                commit('ACCEPT_USER_DELETE', id);
                commit('ACCEPT_USER_ADD', result);
                rootState.stands.stands.push(result.standAccept[0]);


            } catch (err) {
                console.error("Error in acceptUserStore():", err);
            }
        },


        async refuseUserStore({ commit ,state }, id) {
            try {
                await refuseUser(id,state.userCourant.session_id);
                commit('REFUSE_USER', id);
            } catch (err) {
                console.error("Error in refuseUserStore():", err);
            }
        },

        async createUserStore({ commit, state }, body) {
            try {
                const user = body.user;
                await createUser(user, state.userCourant.session_id);
                commit('CREATE_USER', body);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },


        async registerClientStore({ commit }, body) {
            try {
                const user = body.user;
                await registerClient(user);
                commit('CREATE_USER', body);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },

        async registerPrestataireStore({commit}, user) {
            try {
                const body = { ...user };
                await registerPrestataire(body);
                commit('CREATE_USER_ATTENTE', body);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },


        async updateUserStore({ commit , state }, body) {
            try {
                await updateUser(body.id_user, body, state.userCourant.session_id);
                commit('UPDATE_USER', body.id_user, body);
            } catch (err) {
                console.error("Error in updateUserStore():", err);
            }
        },

        async deleteUserStore({ commit, state }, id) {
            try {
                const session_id = state.userCourant.session_id
                await deleteUser(id,session_id);
                commit('DELETE_USER', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },

        async checkIfUserHasRight({ state }, right) {
            return state.userCourant && state.userCourant.droits && state.userCourant.droits.includes(right);
        }
    },
};