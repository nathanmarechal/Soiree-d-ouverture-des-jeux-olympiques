import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";


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
    let answer = await postRequest('/emplacement-logistique/add', body, 'CREATEEmplacementLogistique')
    return answer
}

async function deleteEmplacementLogistique(id, ) {
    let answer = await deleteEmplacementLogistiqueFromAPI(id)
    return answer
}

async function deleteEmplacementLogistiqueFromAPI(id) {
    return deleteRequest('/emplacement-logistique/delete?id_emplacement_logistique=' + id, 'deleteEmplacementLogistiqueFromAPI')
}

async function updateEmplacementLogistique(id, body) {
    let answer = await updateEmplacementLogistiqueFromAPI(id, body)
    return answer
}

async function updateEmplacementLogistiqueFromAPI(id, body) {
    return patchRequest('/emplacement-logistique/update?id_emplacement_logistique=' + id, body, 'UPDATEAREA')
}




export {
    getEmplacementLogistique,
    createEmplacementLogistique,
    deleteEmplacementLogistique,
    updateEmplacementLogistique
}