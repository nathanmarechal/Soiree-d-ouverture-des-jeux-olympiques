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

async function updateStand(id, body) {
    let answer = await updateStandFromAPI(id, body)
    return answer
}

async function updateStandFromAPI(id, body) {
    return patchRequest('/stands/' + id, body, 'UPDATESTAND')
}

async function deleteStand(id) {
    let answer = await deleteStandFromAPI(id)
    return answer
}

async function createStandFromAPI(body) {
    console.log("createStandFromAPI: ", body)
    let answer = await postRequest('/stands/add', body, 'CREATESTAND')
    return answer
}

async function createStand(body) {
    let answer = await createStandFromAPI(body)
    return answer
}

async function deleteStandFromAPI(id) {
    return deleteRequest('/stands/delete/' + id, 'DELETESTAND')
}


async function uploadImageDescriptionStandFromAPI(image){
    return postRequestPicture('stands/uploading/picture-description/',image, 'UPLOADPICTUREDESCRIPTIONSTAND')
}

async function uploadImageDescriptionStand(image) {
    let answer = await uploadImageDescriptionStandFromAPI(image);
    return answer;
}

async function getStandByUserIdFromAPI(id) {
    return getRequest('/stands/get/' + id, 'GETPRESTATIONBYUSERID')
}

async function getStandByUserId(id) {
    let answer = await getStandByUserIdFromAPI(id)
    console.log("getPrestationByUserId: ", answer)
    return answer
}

async function updateDescriptionStandFromAPI(id, body) {
    return patchRequest('/stands/description/' + id, body, 'UPDATEDESCRIPTIONSTAND')
}

async function updateDescriptionStand(id, body) {
    let answer = await updateDescriptionStandFromAPI(id, body)
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