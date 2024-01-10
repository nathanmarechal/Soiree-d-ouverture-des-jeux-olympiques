import {postRequest,getRequest,postRequestPicture,patchRequest, deleteRequest} from "@/services/axios.service";

async function getAllStandsFromAPI() {
    let answer = await getRequest('/stands/get', 'GETALLSTANDS')
    //console.log("getAllStandsFromAPI: ", answer)
    return answer
}

async function getAllStands() {
    let answer = await getAllStandsFromAPI()
    //console.log("getAllStands: ", answer)
    return answer
}

async function updateStand(id, body, session_id) {
    let answer = await updateStandFromAPI(id, body, session_id)
    return answer
}

async function updateStandFromAPI(id, body, session_id) {
    return patchRequest('/stands?session_id=' + session_id + "&id_stand=" + id, body, 'UPDATESTAND')
}

async function deleteStand(id, session_id) {
    let answer = await deleteStandFromAPI(id, session_id)
    return answer
}

async function createStandFromAPI(body, session_id) {
    console.log("createStandFromAPI: ", body, session_id)
    let answer = await postRequest('/stands/add?session_id=' + session_id, body, 'CREATESTAND')
    return answer
}

async function createStand(body, session_id) {
    let answer = await createStandFromAPI(body, session_id)
    return answer
}

async function deleteStandFromAPI(id, session_id) {
    return deleteRequest('/stands/delete?session_id=' + session_id  + "&id_stand=" + id, 'DELETESTAND')
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
    console.log("getPrestationByUserId: ", answer)
    return answer
}

async function updateDescriptionStandFromAPI(id, body, session_id) {
    return patchRequest('/stands/description?session_id=' + session_id + "&id_stand=" + id, body, 'UPDATEDESCRIPTIONSTAND')
}

async function updateDescriptionStand(id, body, session_id) {
    let answer = await updateDescriptionStandFromAPI(id, body, session_id)
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