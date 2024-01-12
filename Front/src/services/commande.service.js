import {getRequest, patchRequest, postRequest} from "@/services/axios.service";


async function getCommandeUserCourant(session_id){
    let answer = await getCommandeUserCourantFromApi(session_id)
    return answer;
}

async function getCommandeUserCourantFromApi(session_id) {
    return getRequest('/commande/getCommandeUserCourant?session_id=' + session_id, 'GETCOMMANDEUSERCOURANT')
}

async function addCommande(id_user){
    let answer = await addCommandeFromApi(id_user)
    return answer;
}

async function getScheduleByUserId(id_user){
    let answer = await getScheduleByUserIdFromApi(id_user)
    return answer;
}

async function getScheduleByUserIdFromApi(id_user) {
    return getRequest('/commande/getSchedule/' + id_user, 'GETSCHEDULEBYUSERID')

}
async function addCommandeFromApi(id_user){
    id_user = {id_user: id_user}
    return postRequest('/commande/add', id_user, 'ADDCOMMANDEFROMPANIERUSER')
}

async function getLigneCommandeBycommandeId(id_commande){
    let answer = await getLigneCommandeBycommandeIdFromApi(id_commande)
    return answer;
}

async function getLigneCommandeBycommandeIdFromApi(id_commande) {
    return getRequest('/commande/getligne/' + id_commande, 'GETLIGNECOMMANDEBYCOMMANDEID')
}

async function setEtatLigneCommandeExterieur({id_commande, id_prestation, id_creneau}){
    let answer = await setEtatLigneCommandeExterieurFromAPI({id_commande, id_prestation, id_creneau})
    return answer;
}

async function setEtatLigneCommandeExterieurFromAPI({ id_commande,id_prestation, id_creneau}){
    return patchRequest('/commande/setetatligne', {id_commande, id_prestation, id_creneau}, 'SETETATLIGNECOMMANDEEXTERIEUR')
}

async function getCommandesPrestataires(id_prestataire){
    let answer = await getCommandesPrestatairesFromApi(id_prestataire)
    return answer;
}

async function getCommandesPrestatairesFromApi(id_prestataire) {
    return getRequest('/commande/getCommandesPrestataires/' + id_prestataire, 'GETCOMMANDESPRESTATAIRES')
}

export {
    getCommandeUserCourant,
    addCommande,
    getLigneCommandeBycommandeId,
    setEtatLigneCommandeExterieur,
    getScheduleByUserId,
    getCommandesPrestataires
}