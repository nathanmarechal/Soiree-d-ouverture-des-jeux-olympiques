import {getRequest, postRequest} from "@/services/axios.service";


async function getCommandeUserCourant(id_user){
    let answer = await getCommandeUserCourantFromApi(id_user)
    return answer;
}

async function getCommandeUserCourantFromApi(id_user) {
    return getRequest('/commande/get/' + id_user, 'GETCOMMANDEUSERCOURANT')
}

async function addCommande(id_user){
    let answer = await addCommandeFromApi(id_user)
    return answer;
}

async function addCommandeFromApi(id_user){
    return postRequest('/commande/add', {id_user}, 'ADDPCOMMANDEFROMPANIERUSER')
}

async function getLigneCommandeBycommandeId(id_commande){
    let answer = await getLigneCommandeBycommandeIdFromApi(id_commande)
    return answer;
}

async function getLigneCommandeBycommandeIdFromApi(id_commande) {
    return getRequest('/commande/getligne/' + id_commande, 'GETLIGNECOMMANDEBYCOMMANDEID')
}

export {
    getCommandeUserCourant,
    addCommande,
    getLigneCommandeBycommandeId
}