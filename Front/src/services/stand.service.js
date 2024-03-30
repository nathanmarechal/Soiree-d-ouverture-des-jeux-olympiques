import {postRequest,getRequest,postRequestPicture,patchRequest, deleteRequest} from "@/services/axios.service";

async function getAllStandsFromAPI() {
    let answer = await getRequest('/stands/get', 'GETALLSTANDS')
    return answer
}

async function getAllStands() {
    let answer = await getAllStandsFromAPI()
    return answer
}

async function updateStand(id, body) {
    let answer = await updateStandFromAPI(id, body)
    return answer
}

async function updateStandFromAPI(id, body) {
    return patchRequest('/stands/update?id_stand=' + id, body, 'UPDATESTAND')
}

async function createStandFromAPI(body) {
    let answer = await postRequest('/stands/add', body, 'CREATESTAND')
    return answer
}

async function createStand(body) {
    let answer = await createStandFromAPI(body)
    return answer
}

async function deleteStand(id) {
    let answer = await deleteStandFromAPI(id)
    return answer
}

async function deleteStandFromAPI(id) {
    return deleteRequest('/stands/delete?id_stand=' + id, 'DELETESTAND')
}


async function uploadImageDescriptionStandFromAPI(image){
    return postRequestPicture('stands/uploading/picture-description/',image, 'UPLOADPICTUREDESCRIPTIONSTAND')
}

async function uploadImageDescriptionStand(image) {
    let answer = await uploadImageDescriptionStandFromAPI(image);
    return answer;
}

async function getStandByUserIdFromAPI(id) {
    return getRequest('/stands/get?id_stand=' + id, 'GETPRESTATIONBYUSERID')
}

async function getStandByUserId(id) {
    let answer = await getStandByUserIdFromAPI(id)
    return answer
}

async function updateDescriptionStandFromAPI(body, session_id) {
    return patchRequest('/stands/description?session_id=' + session_id, body, 'UPDATEDESCRIPTIONSTAND')
}

async function updateDescriptionStand(body, session_id) {
    let answer = await updateDescriptionStandFromAPI(body, session_id)
    return answer
}

async function uploadImageStandFromAPI(image){
    return postRequestPicture('/stands/add/picture/',image, 'UPLOADPICTURESTANDS')
}

async function uploadImageStand(image) {
    let answer = await uploadImageStandFromAPI(image);
    return answer;
}


export {
    getAllStands,
    uploadImageDescriptionStand,
    getStandByUserId,
    updateDescriptionStand,
    deleteStand,
    updateStand,
    uploadImageStand,
    createStand
}