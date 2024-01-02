import Vue from 'vue'
import Vuex from 'vuex'

import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    updateSolde,
    updateUserCourantWoPassword, createUserWithStand, getAllUsersAttente, acceptUser, refuseUser
} from "@/services/utilisateur.service";
import {
    getAllRoles,
    deleteRole,
    updateRole,
    createRole
} from "@/services/role.service";
import {getAllAreas, getAllZones, getAllTypeZones, deleteZone, updateZone, createZone, updateArea, deleteArea, createArea} from "@/services/map.service";
import {getAllPrestations, getAllTypePrestations,createPrestation,updateIsAvailablePrestation,updatePrestation,deletePrestation} from "@/services/prestation.service";
import {getAllStands, deleteStand, updateStand,updateDescriptionStand} from "@/services/stand.service";
import {
    addPrestationToPanierUser,
    deletePrestationFromPanierUser,
    getAllCreneaux,
    getPanierUserCourant,
    updateQuantityInPanier
} from "@/services/panier.service";
import {
    addCommande, getCommandesPrestataires,
    getCommandeUserCourant,
    getLigneCommandeBycommandeId, getScheduleByUserId,
    setEtatLigneCommandeExterieur
} from "@/services/commande.service";
import {
    getAllDroits,
} from "@/services/droit.service";
import {
    getAllRoleDroitAssociation,
    createRoleDroitAssociation,
    deleteRoleDroitAssociation,
    deleteRoleDroitAssociationForSpecificRole
} from "@/services/role_droit.service";

import {getTypeEmplacementLogistique} from "@/services/typeEmplacementLogistique.service";
import {getEmplacementLogistique,createEmplacementLogistique,updateEmplacementLogistique,deleteEmplacementLogistique} from "@/services/emplacementLogistique.service";
import {getAllDescription, updateDescriptionHomePage} from "@/services/homePage.service";
import {deleteAvis, getAvisByIdStand, uploadAvis} from "@/services/avis.service";

Vue.use(Vuex)

export default new Vuex.Store({
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
            "commandes" : [ {"id_commande": null, "date_commande": null, "id_etat_commande": null, "prix_total": null, "nbr_presta": null, "libelle": null, "lignes_commande" : [{ "id_commande":null,"prestation_libelle" : null, "id_presta" : null,"id_creneau": null, "quantite": null, "creneau": null, "prix": null, "image": null, "id_type_prestation": null, "type_prestation_libelle": null, "id_etat_commande":null, "etat_libelle":null}] }],
            "id_role": null,
            "id_stand" : null,
        },
        usersAttente: [],
        creneau: [],
        users : [],
        roles : [],
        droits : [],
        roleDroitAssociation : [],
        typeZone: [],
        zones: [],
        areas : [],
        stands: [],
        prestations: [],
        typePresations: [],
        typeEmplacementLogistique: [],
        emplacementLogistique: [],

        areaSelectedForStand: null,
        isLoginOpen: false,
        isUserConnected: false,

        selectedZone: [],
        searchQuery: '',
        selectedTypeZones: [],


        selectedTypePrestation: [],
        selectedStands: [],
        provenance : null,

        avis : null,

        commandesPrestataire : [],

        texts_home: [],

        lang:"fr"
    },

    getters: {
        getAllZone: state => state.zones,
        getAllUsers : state => state.users,
        getAllUsersAttente : state => state.usersAttente,
        getAllRoles : state => state.roles,
        getAllDroits : state => state.droits,
        getAllRoleDroitAssociation : state => state.roleDroitAssociation,
        //give me the droits that have the same id as the drotis associated to the id_role
        getRoleDroits : (state) => (id_role) => {
            const getThisRoleDroitsAssociation = []
            const getThisRoleDroits = []
            //console.log(state.roleDroitAssociation)
            state.roleDroitAssociation.forEach(item => {
                if (item.id_role === id_role.id_role) {
                    getThisRoleDroitsAssociation.push(item.id_droit)
                }
            })
           // console.log("getThisRoleDroitsAssociation: ", getThisRoleDroitsAssociation)
           // console.log("state.droits: ", state.droits)
            state.droits.forEach(item => {
                //console.log("item.id: ", item.id)
                if (getThisRoleDroitsAssociation.includes(item.id)) {
                    getThisRoleDroits.push(item)
                }
            })
            //console.log("getThisRoleDroits: ", getThisRoleDroits)
            return getThisRoleDroits;
        },
        getAllTypeZone: state => state.typeZone,
        getAllArea: state=> state.areas,
        getAllStand: state => state.stands,
        getAllTypePrestation: state => state.typePresations,
        getAllPrestation: state => state.prestations,
        getAllTypeEmplacementLogistique: state => state.typeEmplacementLogistique,
        getAllEmplacementLogistique: state => state.emplacementLogistique,

        getIdUserCourant: state => state.userCourant.id_user,
        getAllCreneau: state => state.creneau,
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

        getSelectedZone: state => state.selectedZone,
        getSelectedTypePrestation: state => state.selectedTypePrestation,
        getSelectedStands : state => state.selectedStands,
        getSearchQuery: state => state.searchQuery,

        isLoginOpen: state => state.isLoginOpen,

        isUserConnected: state => state.isUserConnected,

        getAreaSelectedForStand: state=> state.areaSelectedForStand,
        getSelectedTypeZones: state=> state.selectedTypeZones,
        getLang: state=> state.lang,

        getTextsHome: state => state.texts_home,

        getAvis : state => state.avis,
        // getAvisByStandId: (state) => (id) => {
        //     cons
        //     return state.avis.filter(avis => avis.id_stand === id);
        // },
    },

    mutations: {

        SET_TEXTS_HOME(state, texts_home) {
            state.texts_home = texts_home;
        },

        SET_USERS(state, users) {
            state.users.splice(0)
            users.forEach(p => state.users.push(p))
        },

        SET_USERS_ATTENTE(state, usersAttente) {
            state.usersAttente = usersAttente;
        },

        ACCEPT_USER(state, id) {
            let user = state.usersAttente.find(user => user.id_user === id);
            state.usersAttente = state.usersAttente.filter(user => user.id_user !== id);
            state.users.push(user);
        },

        REFUSE_USER(state, id) {
            state.usersAttente = state.usersAttente.filter(user => user.id_user !== id);
        },


        SET_ROLES(state, roles) {
          state.roles = roles;
        },

        SET_DROITS(state, droits) {
            state.droits = droits;
        },

        SET_ROLE_DROIT_ASSOCIATION(state, roleDroitAssociation) {
            state.roleDroitAssociation = roleDroitAssociation;
        },

        CREATE_ROLE_DROIT_ASSOCIATION(state, payload) {
            state.roleDroitAssociation.push(payload);
        },

        DELETE_ROLE_DROIT_ASSOCIATION(state, payload) {
            state.roleDroitAssociation = state.roleDroitAssociation.filter(item => item.id_role !== payload.id_droit && item.id_droit !== payload.id_droit);
        },

        DELETE_ROLE_DROIT_ASSOCIATION_FOR_SPECIFIC_ROLE(state, payload) {
            state.roleDroitAssociation = state.roleDroitAssociation.filter(item => item.id_role !== payload.id_role);
        },

        SET_ZONES(state, zones) {
            state.zones.splice(0)
            zones.forEach(p => state.zones.push(p))
        },

        SET_AREAS(state, areas) {
            state.areas.splice(0)
            areas.forEach(p => state.areas.push(p))
        },

        SET_TYPE_EMPLACEMENT_LOGISITIQUE(state, typeEmplacementLogistique) {
            state.typeEmplacementLogistique = typeEmplacementLogistique;
        },
        SET_EMPLACEMENT_LOGISITIQUE(state, emplacementLogistique) {
            state.emplacementLogistique = emplacementLogistique;
        },

        UPDATE_AREA(state, data) {
            const area = state.areas.find(area => area.id_emplacement === data.id);
            if (area) {
                area.id_zone = data.body.id_zone;
            }
        },

        DELETE_AREA(state, id) {
            state.areas = state.areas.filter(item => item.id_emplacement !== id);
        },

        CREATE_AREA(state, payload) {
            state.areas.push(payload);
        },

        CREATE_PRESTATION(state, payload) {
            state.prestations.push(payload);
        },


        CREATE_EMPLACEMENT_LOGISITIQUE(state, payload) {
            state.emplacementLogistique.push(payload);
        },

        SET_TYPE_ZONE(state, typeZone) {
          state.typeZone = typeZone;
        },

        SET_STANDS(state, stands) {
            state.stands = stands;
        },

        UPDATE_STAND(state, payload) {
            state.stands = state.stands.map(item => {
                if (item.id_stand === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_HomePage(state, payload) {
            state.texts_home = state.texts_home.map(item => {
                if (item.id_text_accueil === payload.id_text_accueil) {
                    console.log("item.id_text_accueil " + item.id_text_accueil + " payload.id_text_accueil " + payload.id_text_accueil);
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_EMPLACEMENT_LOGISITIQUE(state, payload) {
            state.emplacementLogistique = state.emplacementLogistique.map(item => {
                if (item.id_emplacement_logistique === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        DELETE_EMPLACEMENT_LOGISITIQUE(state, id) {
            state.emplacementLogistique = state.emplacementLogistique.filter(item => item.id_emplacement_logistique !== id);
        },

        SET_AVIS(state, avis) {
            state.avis = avis;
        },

        ADD_AVIS(state, avis) {
            console.log("ADD_AVIS " + avis);
        },

        DELETE_AVIS(state, id) {
            console.log(state.avis)
            state.avis = state.avis.filter(item => item.id_avis_stand_utilisateur !== id);
            console.log(state.avis)
        },

        DELETE_STAND(state, id) {
            state.stands = state.stands.filter(item => item.id_stand !== id);
        },

        SET_TYPE_PRESTATIONS(state, typePresations) {
            state.typePresations = typePresations;
        },

        SET_PRESTATIONS(state, prestations) {
            state.prestations = prestations;
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
            //console.log("DELETE_PRESTATION_FROM_PANIER_USER_COURANT " + payload.id_prestation + " " + payload.id_creneau);
            //console.log(state.userCourant.panier)
            state.userCourant.panier = state.userCourant.panier.filter(item =>
                !(item.id_prestation === payload.id_prestation && item.id_creneau === payload.id_creneau));
            //console.log(state.userCourant.panier)
        },

        DELETE_ZONE(state, id) {
            state.zones = state.zones.filter(item => item.id_zone !== id);
        },

        UPDATE_ZONE(state, payload) {
            state.zones = state.zones.map(item => {
                if (item.id_zone === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

         UPDATE_PRESTATION_QUANTITY_IN_PANIER(state, { id_user, id_prestation, quantite, id_creneau }) {
            console.log("nouvelleQuantite " + quantite);
            state.userCourant.panier = state.userCourant.panier.map(item => {
                if (item.id_user === id_user && item.id_prestation === Number(id_prestation) && item.id_creneau === id_creneau) {
                    console.log("quantite " + item.quantite);
                    console.log("nouvelleQuantite " + quantite);
                    return { ...item, quantite: quantite };
                }
                console.log("UPDATE_PRESTATION_QUANTITY_IN_PANIER " + item.id_user + " presta " + item.id_prestation + " creneau " + item.id_creneau + " quantité " + item.quantite);
                return item;
            });
        },


        CREATE_ZONE(state, payload) {
            state.zones.push(payload);
        },

        ADD_PRESTATION_TO_PANIER_USER_COURANT(state, id_user, id_prestation, quantite, id_creneau) {
            state.userCourant.panier.push({"id_user" : id_user, "id_prestation" : id_prestation, "quantite" : quantite, "id_creneau": id_creneau});
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

        SET_SELECTED_TYPE_PRESTATION(state, type) {
            state.selectedTypePrestation = type;
        },

        SET_SELECTED_ZONE(state, zone) {
            state.selectedZone = zone;
        },

        SET_SELECTED_STANDS(state, stands) {
            state.selectedStands = stands;
        },

        SET_SELECTED_TYPE_ZONES(state, typeZones) {
            state.selectedTypeZones = typeZones;
        },

        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query;
        },
        SET_SELECTED_AREA(state, area){
            state.areaSelectedForStand = area;
        },

        SET_ALL_CRENEAU(state, creneau){
            state.creneau = creneau;
        },

        CREATE_USER(state, payload) {
            state.users.push(payload);
        },

        CREATE_ROLE(state, payload) {
            state.roles.push(payload);
        },

        DELETE_USER(state, id) {
            state.users = state.users.filter(item => item.id_user !== id);
        },

        DELETE_PRESTATION(state, id) {
            state.prestations = state.prestations.filter(item => item.id_prestation !== id);
        },
        DELETE_ROLE(state, id) {
            state.roles = state.roles.filter(item => item.id_role !== id);
        },

        UPDATE_USER(state, payload) {
            state.users = state.users.map(item => {
                if (item.id_user === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_PRESTATION(state, payload) {
            state.prestations = state.prestations.map(item => {
                if (item.id_prestation === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_ROLE(state, payload) {
            state.roles = state.roles.map(item => {
                if (item.id_role === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_SOLDE(state, newsolde) {
            console.log("update solde " + newsolde);
            state.userCourant.solde = parseFloat(newsolde);
        },

        UPDATE_NOM(state, nom) {
            console.log("update nom " + nom);
            state.userCourant.nom = nom;
        },

        UPDATE_PRENOM(state, prenom) {
            console.log("update prenom " + prenom);
            state.userCourant.prenom = prenom;
        },

        UPDATE_EMAIL(state, email) {
            console.log("update email " + email);
            state.userCourant.email = email;
        },

        SET_LANG(state,lang)
        {
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

        async getPanierUserCourantStore({commit},user_id){
            try {
                const panier = await getPanierUserCourant(user_id);
                commit('SET_PANIER_USER_COURANT', panier);
                console.log("le panier dans le store : " + panier)
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },

        async updateQuantityInPanierStore({commit}, {id_user, id_prestation, id_creneau , quantite}) {
            try {
                await updateQuantityInPanier({id_user, id_prestation, id_creneau , quantite});
                commit('UPDATE_PRESTATION_QUANTITY_IN_PANIER', {id_user, id_prestation, id_creneau , quantite});
            }
            catch (error) {
                console.error('Error updating panier:', error);
            }
        },

        async addPrestationToPanierUserCourantStore({commit},{id_user, id_prestation, quantite, id_creneau}){
            try {
                await addPrestationToPanierUser({id_user, id_prestation, quantite, id_creneau});
                commit('ADD_PRESTATION_TO_PANIER_USER_COURANT', id_user, id_prestation, quantite, id_creneau);
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },

        async deletePrestationFromPanierUserCourantStore({ commit },{id_user, id_prestation, id_creneau}){
            try {
                console.log("deletePrestationFromPanierUserCourantStore " + id_user + " " + id_prestation + " " + id_creneau);
                await deletePrestationFromPanierUser( id_user, id_prestation, id_creneau);
                commit('DELETE_PRESTATION_FROM_PANIER_USER_COURANT', {id_prestation, id_creneau,});
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },

        //ne pas toucher svp, c'est normal si ce n'est pas méthode domas
        async setEtatLigneCommandeExterieurStore({ commit }, { id_commande, id_prestation, id_creneau}) {
            console.log({ id_commande, id_prestation, id_creneau})
            try {
                await setEtatLigneCommandeExterieur({ id_commande, id_prestation, id_creneau});
                commit('SET_ETAT_LIGNE_COMMANDE_EXTERIEUR', { id_commande, id_prestation, id_creneau});
            } catch (err) {
                console.error("Error in setEtatLigneCommandeExterieurStore():", err);
            }
        },

        async updateUserCourantWoPasswordStore({ commit }, {id_user, nom, prenom, email, adresse, code_postal, commune}) {
            try {
                await updateUserCourantWoPassword( {id_user, nom, prenom, email, adresse, code_postal, commune});
                commit('UPDATE_USER_WO_PASSWORD', {id_user, nom, prenom, email, adresse, code_postal, commune});
            } catch (err) {
                console.error("Error in updateNomStore():", err);
            }
        },

        async updateSoldeStore({ commit }, {id_user, solde}) {
            try {
                await updateSolde({id_user, solde});
                console.log("updateSoldeStore: ", id_user, solde)
                commit('UPDATE_SOLDE', solde);
            } catch (err) {
                console.error("Error in updateSoldeStore():", err);
            }
        },

        async getLigneCommandebyIdCommandeStore({commit}, id_commande){
            try {
                const ligne_commande = await getLigneCommandeBycommandeId(id_commande);
                commit('SET_LIGNE_COMMANDE', { id_commande, ligne_commande });
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

//-----------------------------------------------------------------Schedule-----------------------------------------------------------------------//

        async getScheduleByUserIdStore({commit}, id){
            try {
                const schedule = await getScheduleByUserId(id);
                console.log("schedule envoyée au store" + JSON.stringify(schedule))
                commit('SET_SCHEDULE', schedule);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        },

//-----------------------------------------------------------------Avis---------------------------------------------------------------------------//


        async getAvisStore({ commit }, id_stand) {
            try {
                const avis = await getAvisByIdStand(id_stand);
                commit('SET_AVIS', avis);
            } catch (error) {
                console.error('Error fetching avis:', error);
            }
        },

        async uploadAvisStore({ commit }, {id_stand, id_user, note, commentaire}) {
            try {
                const avis = await uploadAvis({id_stand, id_user, note, commentaire});
                commit('ADD_AVIS', avis);
            } catch (error) {
                console.error('Error fetching avis:', error);
            }
        },

        async deleteAvisStore({ commit }, id) {
            try {
                await deleteAvis(id);
                console.log("deleteAvisStore: ", id)
                commit('DELETE_AVIS', id);
            } catch (error) {
                console.error('Error fetching avis:', error);
            }
        },


//-----------------------------------------------------------------Commande-----------------------------------------------------------------------//


        async getCommandeUserCourantStore({commit},user_id){
            try {
                const commandes = await getCommandeUserCourant(user_id);
                commit('SET_COMMANDES_USER_COURANT', commandes);
                console.log("commande envoyée au store" + JSON.stringify(commandes))
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

        async addCommandeFromPanierStore({commit},id_user){
            try {
                console.log("dans le store" + id_user)
                const lastinstert = await addCommande(id_user);
                commit('ADD_COMMANDES_USER_COURANT', lastinstert);
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

        async getCommandesPrestataireStore({commit},id_user){
            try {
                const commandes = await getCommandesPrestataires(id_user);
                commit('SET_COMMANDS_PRESTATAIRE', commandes);
                console.log("commande envoyée au store" + JSON.stringify(commandes))
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },




//-----------------------------------------------------------------Creneau-----------------------------------------------------------------------//

        async getCreneauStore({ commit }){
            try {
                const creneau = await getAllCreneaux();
                commit('SET_ALL_CRENEAU', creneau);
            } catch (error) {
                console.error('Error fetching creneau:', error);
            }
        },

//-----------------------------------------------------------------User-----------------------------------------------------------------------//


        async getUsersStore({ commit }) {
            try {
                const result = await getAllUsers();
                if (Array.isArray(result)) {
                    commit('SET_USERS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getUsersStore():", err);
            }
        },

        async getAllUsersAttenteStore({ commit }) {
            try {
                const usersAttente = await getAllUsersAttente();
                commit('SET_USERS_ATTENTE', usersAttente);
                console.log("usersAttente: ", usersAttente)
                console.log("usersAttente: ", this.state.usersAttente)
            } catch (error) {
                console.error('Error fetching creneau:', error);
            }
        },

        async acceptUserStore({ commit }, id) {
            try {
                await acceptUser(id);
                commit('ACCEPT_USER', id);
            } catch (err) {
                console.error("Error in acceptUserStore():", err);
            }
        },

        async refuseUserStore({ commit }, id) {
            try {
                await refuseUser(id);
                commit('REFUSE_USER', id);
            } catch (err) {
                console.error("Error in refuseUserStore():", err);
            }
        },

        async createUserStore({ commit }, body) {
            try {
                const user = body.user;
                await createUser(user);
                commit('CREATE_USER', body);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },

        async createUsersWithStandStore({ commit }, user, stand) {
            try {
                const body = {
                    ...user,
                    ...stand
                };
                console.log("body: ", body)
                await createUserWithStand(body);
                commit('CREATE_USER', body);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },

        async updateUserStore({ commit }, {body}) {
            try {
                await updateUser(body.id_user, body);
                console.log("eee", body, "id", body.id_user)
                commit('UPDATE_USER', body.id_user, body);
            } catch (err) {
                console.error("Error in updateUserStore({ ...item, ...payload.body }):", err);
            }
        },

        async deleteUserStore({ commit }, id) {
            try {
                await deleteUser(id);
                commit('DELETE_USER', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },

//----------------------------------------------------------------------Role--------------------------------------------------------------------//

        async getRolesStore({ commit }) {
            try {
                const roles = await getAllRoles();
                //if (result.error === 0) {
                if (Array.isArray(roles)) {
                    commit('SET_ROLES', roles);
                } else {
                    console.error("Unexpected response format:", roles);
                }
            } catch (err) {
                console.error("Error in getRolesStore():", err);
            }
        },

        async createRoleStore({ commit }, body) {
            try {
                //console.log("createRoleStore: ", body)
                const data = await createRole(body);
                //console.log("datacreate: ", data.rows[0]);
                commit('CREATE_ROLE', data.rows[0]);
                return data.rows[0];
            } catch (err) {
                console.error("Error in createRoleStore():", err);
            }
        },

        async deleteRoleStore({ commit }, id) {
            try {
                const data = await deleteRole(id);
                //console.log("datadelete: ", data.rows[0].id_role);
                commit('DELETE_ROLE', data.rows[0].id_role);
            } catch (err) {
                console.error("Error in deleteRoleStore():", err);
            }
        },

        async updateRoleStore({ commit }, id, body) {
            try {
                const data = await updateRole(id, body);
                //console.log("dataupdate: ", data);
                commit('UPDATE_ROLE', data.id_role, data);
                return data;
            } catch (err) {
                console.error("Error in updateRoleStore():", err);
            }
        },

//-----------------------------------------------------------------Droits-----------------------------------------------------------------------//

        async getDroitsStore({ commit }) {
            try {
                const result = await getAllDroits();
                if (Array.isArray(result)) {
                    commit('SET_DROITS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getDroitsStore():", err);
            }
        },

        async getAllRoleDroitAssociationStore({ commit }) {
            try {
                const result = await getAllRoleDroitAssociation(); // Wait for the Promise to resolve
                // print what kind of object is result
                //console.log("result: ", result);
        
                if (Array.isArray(result)) {
                    commit('SET_ROLE_DROIT_ASSOCIATION', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getAllRoleDroitAssociationStore():", err);
            }
        },      
        
        async createRoleDroitAssociationStore({ commit }, body) {
            try {
                //console.log("createRoleDroitAssociationStore: ", body)
                const data = await createRoleDroitAssociation(body);
                console.log("datcreatea: ", data[0]);
                let statebefore = this.state.roleDroitAssociation
                console.log("statebefore", statebefore)
                commit('CREATE_ROLE_DROIT_ASSOCIATION', data[0]);
                let stateafter = this.state.roleDroitAssociation
                console.log("stateafter", stateafter)
                let newline = stateafter.filter(item => !statebefore.includes(item))
                console.log("newline", newline)
                return data[0];
            } catch (err) {
                console.error("Error in createRoleDroitAssociationStore():", err);
            }
        },

        async deleteRoleDroitAssociationStore({ commit }, body) {
            try {
                //console.log("deleteRoleDroitAssociationStore: ", body)
                const data = await deleteRoleDroitAssociation(body);
                //console.log("datdeletea: ", data[0]);
                commit('DELETE_ROLE_DROIT_ASSOCIATION', data[0]);
            } catch (err) {
                console.error("Error in deleteRoleDroitAssociationStore():", err);
            }
        },

        async deleteRoleDroitAssociationForSpecificRoleStore({ commit }, id_role) {
            try {
                //console.log("deleteRoleDroitAssociationForSpecificRoleStore: ", id_role)
                const data = await deleteRoleDroitAssociationForSpecificRole(id_role);
                //console.log("datdeletea: ", data[0]);
                commit('DELETE_ROLE_DROIT_ASSOCIATION_FOR_SPECIFIC_ROLE', data[0]);
            } catch (err) {
                console.error("Error in deleteRoleDroitAssociationForSpecificRoleStore():", err);
            }
        },

//-----------------------------------------------------------------Prestation-----------------------------------------------------------------------//

        async updateIsAvailablePrestationStore({ commit }, body) {
            try {
                console.log("id : " + body.id)
                console.log("body : " + body.is_available)
                console.log("body : " + JSON.stringify(body, null, 2))
                await updateIsAvailablePrestation(body.id, body.is_available);
                commit('UPDATE_PRESTATION', body.id, body);
            } catch (err) {
                console.error("Error in updatePrestationIsAvailableRoleStore():", err);
            }
        },

        async updatePrestationStore({ commit }, body) {
            try {
                console.log(body)
                await updatePrestation(body.id_prestation, body)
                commit('UPDATE_PRESTATION', body.id_prestation, body);
            } catch (err) {
                console.error("Error in updatePrestationIsAvailableRoleStore():", err);
            }
        },

        async deletePrestationStore({ commit }, id) {
            try {
                await deletePrestation(id);
                commit('DELETE_PRESTATION', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },

        async createPrestationStore({ commit }, body) {
            try {
                console.log("createPrestation: ", body)
                console.log("body : " + JSON.stringify(body, null, 2))

                let response = await createPrestation(body);
                commit('CREATE_PRESTATION', response[0]);
            } catch (err) {
                console.error("Error in createPrestationStore():", err);
            }
        },

//-----------------------------------------------------------------TypePrestation-----------------------------------------------------------------------//

        async getTypePrestationsStore({ commit }) {
            try {
                const result = await getAllTypePrestations();
                if (Array.isArray(result)) {
                    commit('SET_TYPE_PRESTATIONS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getTypePrestationsStore():", err);
            }
        },


//----------------------------------------------------------------------TypeZone--------------------------------------------------------------------//

        async getTypeZonesStore({ commit }) {
          try {
            const typeZone = await getAllTypeZones();
            if (Array.isArray(typeZone)) {
              commit('SET_TYPE_ZONE', typeZone);
            } else {
              console.error("Unexpected response format:", typeZone);
            }
          } catch (err) {
            console.error("Error in getTypeZone():", err);
          }
        },

//----------------------------------------------------------------------typeEmplacementLogistique--------------------------------------------------------------------//

        async getTypeEmplacementLogistiqueStore({ commit }) {
          try {
            const typeEmplacementLogistique = await getTypeEmplacementLogistique();
            if (Array.isArray(typeEmplacementLogistique)) {
              commit('SET_TYPE_EMPLACEMENT_LOGISITIQUE', typeEmplacementLogistique);
            } else {
              console.error("Unexpected response format:", typeEmplacementLogistique);
            }
          } catch (err) {
            console.error("Error in getTypeZone():", err);
          }
        },
//----------------------------------------------------------------------EmplacementLogistique--------------------------------------------------------------------//

        async getEmplacementLogistiqueStore({ commit }) {
          try {
            const emplacementLogistique = await getEmplacementLogistique();
            if (Array.isArray(emplacementLogistique)) {
              commit('SET_EMPLACEMENT_LOGISITIQUE', emplacementLogistique);
            } else {
              console.error("Unexpected response format:", emplacementLogistique);
            }
          } catch (err) {
            console.error("Error in getEmplacementLogistiqueStore():", err);
          }
        },

        async createEmplacementLogistiqueStore({ commit }, body) {
            try {
                let response =  await createEmplacementLogistique(body);
                commit('CREATE_EMPLACEMENT_LOGISITIQUE', response[0]);
            } catch (err) {
                console.error("Error in createEmplacementLogistiqueStore():", err);
            }
        },

        async updateEmplacementLogistiqueStore({ commit }, {id,body}) {
            try {
                console.log(id)
                console.log(body)
                let response = await updateEmplacementLogistique(id, body)

                console.log(response[0])
                commit('UPDATE_EMPLACEMENT_LOGISITIQUE',{id: id, body: response[0]});
            } catch (err) {
                console.error("Error in updateEmplacementLogistiqueStore():", err);
            }
        },

        async deleteEmplacementLogistiqueStore({ commit }, id) {
            try {

                await deleteEmplacementLogistique(id);
                await commit('DELETE_EMPLACEMENT_LOGISITIQUE', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },


//----------------------------------------------------------------------Zone--------------------------------------------------------------------//

        async getZonesStore({ commit }) {
          try {
              const result = await getAllZones();
              if (Array.isArray(result)) {
                  commit('SET_ZONES', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getZones():", err);
          }
        },

        async deleteZoneStore({ commit }, id) {
            try {
                await deleteZone(id);
                commit('DELETE_ZONE', id);
            } catch (err) {
                console.error("Error in deleteZoneStore():", err);
            }
        },

        async updateZoneStore({ commit }, {id, body}) {
            try {
                await updateZone(id, body);
                commit('UPDATE_ZONE', id, body);
            } catch (err) {
                console.error("Error in updateZoneStore():", err);
            }
        },

        async createZoneStore({ commit }, body) {
            try {
                body['session_id'] = this.state.userCourant.session_id
                const newZone = await createZone(body);
                console.log("newZone: ", JSON.stringify(newZone[0], null, 2))
                commit('CREATE_ZONE', newZone[0]);
            } catch (err) {
                console.error("Error in createZoneStore():", err);
            }
        },

//----------------------------------------------------------------------Emplacement--------------------------------------------------------------------//

        async getAreasStore({ commit }) {
          try {
              const result = await getAllAreas();
              if (Array.isArray(result)) {
                  commit('SET_AREAS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getAreasStore():", err);
          }
        },

        async updateAreasStore({ commit },{id, body}) {
            try {
                await updateArea(id, body);
                console.log("updateAreasStore: ", id, body)
                commit('UPDATE_AREA', {id, body});
            } catch (err) {
                console.error("Error in updateZoneStore():", err);
            }
        },

        async deleteAreasStore({ commit }, id) {
            try {
                await deleteArea(id);
                commit('DELETE_AREA', id);
            } catch (err) {
                console.error("Error in deleteZoneStore():", err);
            }
        },

        async createAreasStore({ commit }, body) {
            try {
                let response =  await createArea(body);
                commit('CREATE_AREA', response[0]);
            } catch (err) {
                console.error("Error in createZoneStore():", err);
            }
        },

//----------------------------------------------------------------------HomePage--------------------------------------------------------------------//

        async updateDescriptionHomePageStore({ commit }, {id_text_accueil, body}) {
            try {
                console.log(id_text_accueil, body)
                await updateDescriptionHomePage(id_text_accueil, body);
                commit('UPDATE_HomePage', {id_text_accueil, body});
            } catch (err) {
                console.error("Error in updateHomePageStore():", err);
            }
        },

        async getTextsHomeStore({ commit }) {
            try {
                const result = await getAllDescription();
                if (Array.isArray(result)) {
                    commit('SET_TEXTS_HOME', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getTextsHome():", err);
            }
        },

//----------------------------------------------------------------------Stand--------------------------------------------------------------------//

        async updateStandStore({ commit }, {id, body}) {
            try {
                console.log(id, body)
                await updateStand(id, body);
                commit('UPDATE_STAND', id, body);
            } catch (err) {
                console.error("Error in updateStandStore():", err);
            }
        },

        async updateDescriptionStandStore({ commit }, {id, body}) {
            try {
                console.log(id, body)
                await updateDescriptionStand(id, body);
                commit('UPDATE_STAND', {id, body});
            } catch (err) {
                console.error("Error in updateStandStore():", err);
            }
        },

        async deleteStandStore({ commit }, id) {
            try {
                await deleteStand(id);
                commit('DELETE_STAND', id);
            } catch (err) {
                console.error("Error in deleteStandStore():", err);
            }
        },


        async getStandsStore({ commit }) {
          try {
              const result = await getAllStands();
              if (Array.isArray(result)) {
                  commit('SET_STANDS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getStands():", err);
          }
        },

//----------------------------------------------------------------------Prestations--------------------------------------------------------------------//


        async getPrestationsStore({ commit }) {
          try {
              const result = await getAllPrestations();
              if (Array.isArray(result)) {
                  commit('SET_PRESTATIONS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getPrestations():", err);
          }
        },

//------------------------------------------------------------------------------------------------------------------------------------------------//

    },
    modules: {
        //autres modules si nécessaire
    }
})
