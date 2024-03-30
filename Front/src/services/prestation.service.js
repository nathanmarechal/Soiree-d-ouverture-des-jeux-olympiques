import {deleteRequest, getRequest, patchRequest, postRequest, postRequestPicture} from "@/services/axios.service";

async function getAllPrestationsFromAPI() {
    let answer = await getRequest('/prestations/get', 'GETALLPRESTATIONS')
    return answer
}

async function getAllPrestations() {
    let answer = await getAllPrestationsFromAPI()
    return answer
}

async function getAllTypePrestationsFromAPI() {
    let answer = await getRequest('/typePrestations/get', 'GETALLTYPEPRESTATIONS')
    return answer
}

async function getAllTypePrestations() {
    let answer = await getAllTypePrestationsFromAPI()
    return answer
}

async function uploadImagePresationFromAPI(image){
    return postRequestPicture('/prestations/add/picture/',image, 'UPLOADPICTUREPRESTATION')
}

async function uploadImagePresation(image) {
    let answer = await uploadImagePresationFromAPI(image);
    return answer;
}


async function createPrestation(body) {
    let answer = await createPrestationFromAPI(body)
    return answer
}

async function createPrestationFromAPI(body) {
    let answer = await postRequest('/prestations/addOwnPrestation', body, 'CREATEPRESTATION')
    return answer
}


async function updateIsAvailablePrestationFromAPI(id, body) {
    return patchRequest('/prestations/updateOwnPrestation/is-available?id_prestation=' + id, body, 'UPDATEPRESTATIONISAVAIBLE')
}

async function updateIsAvailablePrestation(id, body) {
    let answer = await updateIsAvailablePrestationFromAPI(id, body)
    return answer
}
async function updatePrestationFromAPI(id, body) {
    return patchRequest('/prestations/updateOwnPrestation?id_prestation=' + id, body, 'UPDATEPRESTATION')
}

async function updatePrestation(id, body) {
    let answer = await updatePrestationFromAPI(id, body)
    return answer
}


async function deletePrestation(id){
    let answer = await deletePrestationFromApi(id)
    return answer;
}

async function deletePrestationFromApi(id){
    return deleteRequest('/prestations/deleteOwnPrestation?id_prestation='+id , 'DELETEPRESTATIONFROMPANIERUSER')
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