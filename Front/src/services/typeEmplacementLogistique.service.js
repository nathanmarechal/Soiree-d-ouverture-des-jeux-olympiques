import {getRequest} from "@/services/axios.service";


async function getTypeEmplacementLogistique(){
    let answer = await getTypeEmplacementLogistiqueFromApi()
    return answer;
}

async function getTypeEmplacementLogistiqueFromApi() {
    return getRequest('/type-emplacement-logistique/get', 'GETALLTYPEEMPLACEMENTLOGISTIQUE')
}

export {
    getTypeEmplacementLogistique
}