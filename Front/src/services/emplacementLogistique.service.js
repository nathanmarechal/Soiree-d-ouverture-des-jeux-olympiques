import {getRequest, postRequest} from "@/services/axios.service";


async function getEmplacementLogistique(){
    let answer = await getEmplacementLogistiqueFromApi()
    return answer;
}

async function getEmplacementLogistiqueFromApi() {
    return getRequest('/emplacement-logistique/get', 'GETALLEMPLACEMENTLOGISTIQUE')
}

async function createEmplacementLogistique(body) {
    let answer = await createEmplacementLogistiqueFromAPI(body)
    return answer
}

async function createEmplacementLogistiqueFromAPI(body) {
    console.log("createEmplacementLogistiqueFromAPI: ", body)
    let answer = await postRequest('/emplacement-logistique/add', body, 'CREATEEmplacementLogistique')
    return answer
}

export {
    getEmplacementLogistique,
    createEmplacementLogistique
}