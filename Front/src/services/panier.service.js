import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";


async function updateQuantityInPanierFromAPI( {id_prestation, id_creneau, quantite}){
    return patchRequest('/panier/updateOwnPanier', {id_prestation, id_creneau, quantite}, 'UPDATEQUANTITYPRESTATIONFROMPANIERUSER')
}

async function updateQuantityInPanier({id_prestation, id_creneau, quantite}){
    let answer = await updateQuantityInPanierFromAPI({id_prestation, id_creneau, quantite})
    return answer;

}

async function getPanierUserCourantFromApi() {
    return getRequest('/panier/getOwnPanier', 'GETPANIERUSERCOURANT')
}

async function getPanierUserCourant(){
    let answer = await getPanierUserCourantFromApi()
    return answer;
}

async function deletePrestationFromPanierUser( id_prestation, id_creneau){
    let answer = await deletePrestationFromPanierUserFromApi( id_prestation, id_creneau)
    return answer;
}

async function deletePrestationFromPanierUserFromApi(id_prestation, id_creneau){
    return deleteRequest('/panier/deletePrestationFromPanierOwnUser?id_prestation=' + id_prestation + '&id_creneau=' + id_creneau, 'DELETEPRESTATIONFROMPANIERUSER')
}

async function addPrestationToPanierUserFromApi(id_prestation, quantite, id_creneau){
    return postRequest('/panier/addPrestationToOwnPanier', {id_prestation, quantite, id_creneau}, 'ADDPRESTATIONTOPANIERUSER')
}

async function addPrestationToPanierUser( id_prestation, quantite, id_creneau){
    let answer = await addPrestationToPanierUserFromApi(id_prestation, quantite, id_creneau)
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