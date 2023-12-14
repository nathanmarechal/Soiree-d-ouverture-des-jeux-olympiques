import {getRequest} from "@/services/axios.service";


async function getEmplacementLogistique(){
    let answer = await getEmplacementLogistiqueFromApi()
    return answer;
}

async function getEmplacementLogistiqueFromApi() {
    return getRequest('/emplacement-logistique/get', 'GETALLEMPLACEMENTLOGISTIQUE')
}

export {
    getEmplacementLogistique
}