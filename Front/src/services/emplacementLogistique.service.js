import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";


async function getEmplacementLogistique(){
    let answer = await getEmplacementLogistiqueFromApi()
    return answer;
}

async function getEmplacementLogistiqueFromApi() {
    return getRequest('/emplacement-logistique/get', 'GETALLEMPLACEMENTLOGISTIQUE')
}

async function createEmplacementLogistique(body, session_id) {
    let answer = await createEmplacementLogistiqueFromAPI(body, session_id)
    return answer
}

async function createEmplacementLogistiqueFromAPI(body, session_id) {
    console.log("createEmplacementLogistiqueFromAPI: ", body)
    let answer = await postRequest('/emplacement-logistique/add?session_id=' + session_id, body, 'CREATEEmplacementLogistique')
    return answer
}

async function deleteEmplacementLogistique(id, session_id) {
    let answer = await deleteEmplacementLogistiqueFromAPI(id, session_id)
    //console.log("deleteArea: ", answer)
    return answer
}

async function deleteEmplacementLogistiqueFromAPI(id, session_id) {
    return deleteRequest('/emplacement-logistique/delete?session_id=' + session_id + "&id_emplacement_logistique=" + id, 'deleteEmplacementLogistiqueFromAPI')
}


async function updateEmplacementLogistique(id, body, session_id) {
    let answer = await updateEmplacementLogistiqueFromAPI(id, body, session_id)
    //console.log("updateArea: ", answer)
    return answer
}

async function updateEmplacementLogistiqueFromAPI(id, body, session_id) {
    return patchRequest('/emplacement-logistique/update?session_id=' + session_id + "&id_emplacement_logistique=" + id, body, 'UPDATEAREA')
}




export {
    getEmplacementLogistique,
    createEmplacementLogistique,
    deleteEmplacementLogistique,
    updateEmplacementLogistique
}