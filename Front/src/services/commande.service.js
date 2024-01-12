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

async function getScheduleByUserId(session_id){
    let answer = await getScheduleByUserIdFromApi(session_id)
    return answer;
}

async function getScheduleByUserIdFromApi(session_id) {
    return getRequest('/commande/getScheduleCurrentUser?session_id=' + session_id, 'GETSCHEDULEBYUSERID')
}
async function addCommandeFromApi(id_user){
    id_user = {id_user: id_user}
    return postRequest('/commande/addCommandeFromPanierUserCourant', id_user, 'ADDCOMMANDEFROMPANIERUSER')
}

async function getLigneCommandeBycommandeId(id_commande, session_id){
    let answer = await getLigneCommandeBycommandeIdFromApi(id_commande, session_id)
    return answer;
}

async function getLigneCommandeBycommandeIdFromApi(id_commande, session_id) {
    return getRequest('/commande/getLigneCommandeBycommandeId?session_id=' + session_id + '&id_commande=' + id_commande, 'GETLIGNECOMMANDEBYCOMMANDEID')
}

async function setEtatLigneCommandeExterieur({id_commande, id_prestation, id_creneau}){
    let answer = await setEtatLigneCommandeExterieurFromAPI({id_commande, id_prestation, id_creneau})
    return answer;
}

async function setEtatLigneCommandeExterieurFromAPI({ id_commande,id_prestation, id_creneau}){
    return patchRequest('/commande/setetatligne', {id_commande, id_prestation, id_creneau}, 'SETETATLIGNECOMMANDEEXTERIEUR')
}

async function getCommandesPrestataires(session_id){
    let answer = await getCommandesPrestatairesFromApi(session_id)
    return answer;
}

async function getCommandesPrestatairesFromApi(session_id) {
    return getRequest('/commande/getCommandesCurrentPrestataires?session_id=' + session_id, 'GETCOMMANDESPRESTATAIRES')
}

export {
    getCommandeUserCourant,
    addCommande,
    getLigneCommandeBycommandeId,
    setEtatLigneCommandeExterieur,
    getScheduleByUserId,
    getCommandesPrestataires
}