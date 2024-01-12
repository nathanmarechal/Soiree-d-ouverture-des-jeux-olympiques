import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";


async function updateQuantityInPanierFromAPI(session_id, {id_prestation, id_creneau, quantite}){
    return patchRequest('/panier/updateOwnPanier?session_id=' + session_id, {id_prestation, id_creneau, quantite}, 'UPDATEQUANTITYPRESTATIONFROMPANIERUSER')
}

async function updateQuantityInPanier(session_id, {id_prestation, id_creneau, quantite}){
    let answer = await updateQuantityInPanierFromAPI(session_id, {id_prestation, id_creneau, quantite})
    return answer;

}

async function getPanierUserCourantFromApi(session_id) {
    return getRequest('/panier/getOwnPanier?session_id=' + session_id, 'GETPANIERUSERCOURANT')
}

async function getPanierUserCourant(session_id){
    let answer = await getPanierUserCourantFromApi(session_id)
    return answer;
}

async function deletePrestationFromPanierUser(session_id, id_prestation, id_creneau){
    let answer = await deletePrestationFromPanierUserFromApi(session_id, id_prestation, id_creneau)
    return answer;
}

async function deletePrestationFromPanierUserFromApi(session_id, id_prestation, id_creneau){
    return deleteRequest('/panier/deletePrestationFromPanierOwnUser?session_id=' + session_id + '&id_prestation=' + id_prestation + '&id_creneau=' + id_creneau, 'DELETEPRESTATIONFROMPANIERUSER')
}

async function addPrestationToPanierUserFromApi(session_id, id_prestation, quantite, id_creneau){
    return postRequest('/panier/addPrestationToOwnPanier?session_id=' + session_id, {id_prestation, quantite, id_creneau}, 'ADDPRESTATIONTOPANIERUSER')
}

async function addPrestationToPanierUser(session_id, id_prestation, quantite, id_creneau){
    let answer = await addPrestationToPanierUserFromApi(session_id, id_prestation, quantite, id_creneau)
    return answer;
}

async function getAllCreneauxFromApi(){
    return getRequest('/panier/getCreneaux', 'GETCRENEAUX')
}

async function getAllCreneaux(){
    let answer = await getAllCreneauxFromApi()
    return answer;
}

export {
    getPanierUserCourant,
    deletePrestationFromPanierUser,
    getAllCreneaux,
    addPrestationToPanierUser,
    updateQuantityInPanier
}