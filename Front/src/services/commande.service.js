import {getRequest} from "@/services/axios.service";


async function getCommandeUserCourant(id_user){
    let answer = await getCommandeUserCourantFromApi(id_user)
    return answer;
}

async function getCommandeUserCourantFromApi(id_user) {
    return getRequest('/commande/get/' + id_user, 'GETCOMMANDEUSERCOURANT')
}

export {
    getCommandeUserCourant
}