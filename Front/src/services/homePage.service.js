import {patchRequest, postRequestPicture} from "@/services/axios.service";

async function uploadImageDescriptionHomePageFromAPI(image){
    return postRequestPicture('stands/uploading/picture-description/',image, 'UPLOADPICTUREDESCRIPTIONSTAND')
}

async function uploadImageDescriptionHomePage(image) {
    let answer = await uploadImageDescriptionHomePageFromAPI(image);
    return answer;
}

async function updateDescriptionHomePageFromAPI(id, body) {
    return patchRequest('/stands/description/' + id, body, 'UPDATEDESCRIPTIONSTAND')
}

async function updateDescriptionHomePage(id, body) {
    let answer = await updateDescriptionHomePageFromAPI(id, body)
    return answer
}

export {
    uploadImageDescriptionHomePage,
    updateDescriptionHomePage
}