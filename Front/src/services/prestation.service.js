import {deleteRequest, getRequest, patchRequest, postRequest, postRequestPicture} from "@/services/axios.service";

async function getAllPrestationsFromAPI() {
    let answer = await getRequest('/prestations/get', 'GETALLPRESTATIONS')
    console.log("getAllPrestationsFromAPI: ", answer)
    return answer
}

async function getAllPrestations() {
    let answer = await getAllPrestationsFromAPI()
    console.log("getAllPrestations: ", answer)
    return answer
}

async function getAllTypePrestationsFromAPI() {
    let answer = await getRequest('/typePrestations/get', 'GETALLTYPEPRESTATIONS')
    console.log("getAllTypePrestationsFromAPI: ", answer)
    return answer
}

async function getAllTypePrestations() {
    let answer = await getAllTypePrestationsFromAPI()
    console.log("getAllTypePrestations: ", answer)
    return answer
}

async function uploadImagePresationFromAPI(image){
    return postRequestPicture('/prestations/add/picture/',image, 'UPLOADPICTUREPRESTATION')
}

async function uploadImagePresation(image) {
    let answer = await uploadImagePresationFromAPI(image);
    return answer;
}


async function createPrestation(body, session_id) {
    let answer = await createPrestationFromAPI(body, session_id)
    //console.log("createZone: ", answer)
    return answer
}

async function createPrestationFromAPI(body, session_id) {
    let answer = await postRequest('/prestations/add?session_id='+session_id, body, 'CREATEPRESTATION')
    return answer
}


async function updateIsAvailablePrestationFromAPI(id, body, session_id) {
    return patchRequest('/prestations/update/is-available?session_id' + session_id + '&id_prestation=' + id, body, 'UPDATEPRESTATIONISAVAIBLE')
}

async function updateIsAvailablePrestation(id, body, session_id) {
    let answer = await updateIsAvailablePrestationFromAPI(id, body, session_id)
    //console.log("updateZone: ", answer)
    return answer
}
async function updatePrestationFromAPI(id, body, session_id) {
    return patchRequest('/prestations/update?session_id='+session_id+'&id_prestation=' + id, body, 'UPDATEPRESTATION')
}

async function updatePrestation(id, body, session_id) {
    let answer = await updatePrestationFromAPI(id, body, session_id)
    return answer
}


async function deletePrestation(id, session_id){
    let answer = await deletePrestationFromApi(id, session_id)
    return answer;
}

async function deletePrestationFromApi(id, session_id){
    return deleteRequest('/prestations/delete?session_id='+session_id+'&id_prestation='+id , 'DELETEPRESTATIONFROMPANIERUSER')
}


export {
    getAllPrestations,
    getAllTypePrestations,
    uploadImagePresation,
    createPrestation,
    updateIsAvailablePrestation,
    updatePrestation,
    deletePrestation
}