import {getRequest, patchRequest, postRequest} from "@/services/axios.service";


async function getCommandeUserCourant(){
    let answer = await getCommandeUserCourantFromApi()
    return answer;
}

async function getCommandeUserCourantFromApi() {
    return getRequest('/commande/getCommandeUserCourant', 'GETCOMMANDEUSERCOURANT')
}

async function addCommande(){
    let answer = await addCommandeFromApi()
    return answer;
}

async function getScheduleByUserId(){
    let answer = await getScheduleByUserIdFromApi()
    return answer;
}

async function getScheduleByUserIdFromApi() {
    return getRequest('/commande/getScheduleCurrentUser' , 'GETSCHEDULEBYUSERID')
}
async function addCommandeFromApi() {
    return postRequest('/commande/addCommandeFromPanierUserCourant', {}, 'ADDCOMMANDEFROMPANIERUSER')
}

async function getLigneCommandeBycommandeId(id_commande){
    let answer = await getLigneCommandeBycommandeIdFromApi(id_commande)
    return answer;
}

async function getLigneCommandeBycommandeIdFromApi(id_commande) {
    return getRequest('/commande/getLigneCommandeBycommandeId?id_commande=' + id_commande, 'GETLIGNECOMMANDEBYCOMMANDEID')
}

async function setEtatLigneCommandeExterieur({id_commande, id_prestation, id_creneau}){
    let answer = await setEtatLigneCommandeExterieurFromAPI({id_commande, id_prestation, id_creneau})
    return answer;
}

async function setEtatLigneCommandeExterieurFromAPI({ id_commande,id_prestation, id_creneau}){
    return patchRequest('/commande/setetatligne', {id_commande, id_prestation, id_creneau}, 'SETETATLIGNECOMMANDEEXTERIEUR')
}

async function getCommandesPrestataires(){
    let answer = await getCommandesPrestatairesFromApi()
    return answer;
}

async function getCommandesPrestatairesFromApi() {
    return getRequest('/commande/getCommandesCurrentPrestataires', 'GETCOMMANDESPRESTATAIRES')
}

export {
    getCommandeUserCourant,
    addCommande,
    getLigneCommandeBycommandeId,
    setEtatLigneCommandeExterieur,
    getScheduleByUserId,
    getCommandesPrestataires
}