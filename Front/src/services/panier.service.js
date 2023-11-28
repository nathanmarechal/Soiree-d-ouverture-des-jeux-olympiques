import {getRequest} from "@/services/axios.service";

async function getPanierUserCourantFromApi(id_user) {
    return getRequest('/panier/get/' + id_user, 'GETPANIERUSERCOURANT')
}

async function getPanierUserCourant(id_user){
    //console.log("getting a token for "+userEmail+", "+password);
    let answer = await getPanierUserCourantFromApi(id_user)
    //console.log("token : "+answer);
    return answer;
}

export {
    getPanierUserCourant
}