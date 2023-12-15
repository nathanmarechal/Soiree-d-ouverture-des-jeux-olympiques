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
    console.log("createEmplacementLogistiqueFromAPI: ", body)
    let answer = await postRequest('/emplacement-logistique/add', body, 'CREATEEmplacementLogistique')
    return answer
}

async function deleteEmplacementLogistique(id) {
    let answer = await deleteEmplacementLogistiqueFromAPI(id)
    //console.log("deleteArea: ", answer)
    return answer
}

async function deleteEmplacementLogistiqueFromAPI(id) {
    return deleteRequest('/emplacement-logistique/delete/' + id, 'deleteEmplacementLogistiqueFromAPI')
}


async function updateEmplacementLogistique(id, body) {
    let answer = await updateEmplacementLogistiqueFromAPI(id, body)
    //console.log("updateArea: ", answer)
    return answer
}

async function updateEmplacementLogistiqueFromAPI(id, body) {
    return patchRequest('/emplacement-logistique/update/' + id, body, 'UPDATEAREA')
}




export {
    getEmplacementLogistique,
    createEmplacementLogistique,
    deleteEmplacementLogistique,
    updateEmplacementLogistique
}