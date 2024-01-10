import {deleteRequest, getRequest, postRequest, postRequestPicture} from "@/services/axios.service";

async function uploadImageAvisFromAPI(image){
    return postRequestPicture('/avis/uploading/picture-avis/',image, 'UPLOADPICTUREDESCRIPTIONHOMEPAGE')
}

async function uploadImageAvis(image) {
    let answer = await uploadImageAvisFromAPI(image);
    return answer;
}


async function getAvisByIdStand(id_stand){
    let answer = await getAvisByIdStandAsync(id_stand)
    return answer;
}

async function uploadAvisFromAPI(body, session_id) {
    return postRequest('/avis/add?session_id=' + session_id , body, 'UPDATEDESCRIPTIONHOMEPAGE')
}

async function uploadAvis(body, id_session) {
    let answer = await uploadAvisFromAPI(body, id_session)
    return answer
}


async function getAvisByIdStandAsync(id_stand) {
    return getRequest('/avis/getAvisByIdStand?id_stand=' + id_stand, 'GETAVISBYIDSTAND')
}

async function deleteAvis(id, session_id) {
    let answer = await deleteAvisFromAPI(id, session_id)
    return answer
}

async function deleteAvisFromAPI(id, session_id) {
    return deleteRequest('/avis/deleteAvisByIdStandUser?session_id=' + session_id + "&id_avis=" + id, 'DELETEAVIS')
}

export {
    getAvisByIdStand,
    uploadImageAvis,
    uploadAvis,
    deleteAvis
}