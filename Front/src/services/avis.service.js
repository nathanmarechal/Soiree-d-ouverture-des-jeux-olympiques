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

async function uploadAvisFromAPI(body) {
    return postRequest('/avis/add' , body, 'UPDATEDESCRIPTIONHOMEPAGE')
}

async function uploadAvis(body) {
    let answer = await uploadAvisFromAPI(body)
    return answer
}


async function getAvisByIdStandAsync(id_stand) {
    return getRequest('/avis/getAvisByIdStand?id_stand=' + id_stand, 'GETAVISBYIDSTAND')
}

async function deleteAvis(id) {
    let answer = await deleteAvisFromAPI(id)
    return answer
}

async function deleteAvisFromAPI(id) {
    return deleteRequest('/avis/deleteAvisByIdStandUser?id_avis' + id, 'DELETEAVIS')
}

export {
    getAvisByIdStand,
    uploadImageAvis,
    uploadAvis,
    deleteAvis
}