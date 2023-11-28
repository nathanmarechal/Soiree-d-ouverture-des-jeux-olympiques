import {deleteRequest, getRequest} from "@/services/axios.service";

async function getPanierUserCourantFromApi(id_user) {
    return getRequest('/panier/get/' + id_user, 'GETPANIERUSERCOURANT')
}

async function getPanierUserCourant(id_user){
    //console.log("getting a token for "+userEmail+", "+password);
    let answer = await getPanierUserCourantFromApi(id_user)
    //console.log("token : "+answer);
    return answer;
}

async function deletePrestationFromPanierUser(id_user, id_prestation){
    let answer = await deletePrestationFromPanierUserFromApi(id_user, id_prestation)
    return answer;
}

async function deletePrestationFromPanierUserFromApi(id_user, id_prestation){
    return deleteRequest('/panier/delete?id=' + id_user + '&presta=' + id_prestation, 'DELETEPRESTATIONFROMPANIERUSER')
}

export {
    getPanierUserCourant,
    deletePrestationFromPanierUser
}