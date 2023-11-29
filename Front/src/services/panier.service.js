import {deleteRequest, getRequest, postRequest} from "@/services/axios.service";

async function getPanierUserCourantFromApi(id_user) {
    return getRequest('/panier/get/' + id_user, 'GETPANIERUSERCOURANT')
}

async function getPanierUserCourant(id_user){
    //console.log("getting a token for "+userEmail+", "+password);
    let answer = await getPanierUserCourantFromApi(id_user)
    //console.log("token : "+answer);
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

async function getAllCreneaux(){
    let answer = await getAllCreneauxFromApi()
    return answer;
}

async function getAllCreneauxFromApi(){
    return getRequest('/panier/getCreneaux', 'GETCRENEAUX')
}

export {
    getPanierUserCourant,
    deletePrestationFromPanierUser,
    getAllCreneaux,
    addPrestationToPanierUser
}