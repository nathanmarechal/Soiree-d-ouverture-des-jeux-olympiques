import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";


async function updateQuantityInPanierFromAPI({id_user, id_prestation, id_creneau, quantite}){
    console.log("id_user:" + id_user + ", id_prestation:" + id_prestation + " dans le service panier.service.js" + ", quantite:" + quantite + ", id_creneau:" + id_creneau)
    return patchRequest('/panier/update', {id_user, id_prestation, id_creneau, quantite}, 'UPDATEQUANTITYPRESTATIONFROMPANIERUSER')
}

async function updateQuantityInPanier({id_user, id_prestation, id_creneau, quantite}){
    console.log("id_user:" + id_user + ", id_prestation:" + id_prestation + " dans le service panier async.service.js" + ", quantite:" + quantite + ", id_creneau:" + id_creneau)
    let answer = await updateQuantityInPanierFromAPI({id_user, id_prestation, id_creneau, quantite})
    return answer;

}

async function getPanierUserCourantFromApi(id_user) {
    return getRequest('/panier/get/' + id_user, 'GETPANIERUSERCOURANT')
}

async function getPanierUserCourant(id_user){
    let answer = await getPanierUserCourantFromApi(id_user)
    return answer;
}

async function deletePrestationFromPanierUser(id_user, id_prestation, id_creneau){
    let answer = await deletePrestationFromPanierUserFromApi(id_user, id_prestation, id_creneau)
    return answer;
}

async function deletePrestationFromPanierUserFromApi(id_user, id_prestation, id_creneau){
    return deleteRequest('/panier/delete?id=' + id_user + '&presta=' + id_prestation + '&creneau=' + id_creneau, 'DELETEPRESTATIONFROMPANIERUSER')
}

async function addPrestationToPanierUserFromApi({id_user, id_prestation, quantite, id_creneau}){
    return postRequest('/panier/add', {id_user, id_prestation, quantite, id_creneau}, 'ADDPRESTATIONTOPANIERUSER')
}

async function addPrestationToPanierUser({id_user, id_prestation, quantite, id_creneau}){
    let answer = await addPrestationToPanierUserFromApi({id_user, id_prestation, quantite, id_creneau})
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