import {getRequest, patchRequest, postRequestPicture} from "@/services/axios.service";

async function uploadImageDescriptionHomePageFromAPI(image){
    return postRequestPicture('/homePage/uploading/picture-description/',image, 'UPLOADPICTUREDESCRIPTIONHOMEPAGE')
}

async function uploadImageDescriptionHomePage(image) {
    let answer = await uploadImageDescriptionHomePageFromAPI(image);
    return answer;
}

async function updateDescriptionHomePageFromAPI(id, body) {
    return patchRequest('/homePage/description?id_text_accueil=' + id, body, 'UPDATEDESCRIPTIONHOMEPAGE')
}

async function updateDescriptionHomePage(id, body) {
    let answer = await updateDescriptionHomePageFromAPI(id, body)
    return answer
}

async function getAllDescription() {
    let answer = await getAllDescriptionFromAPI()
    return answer
}
async function getAllDescriptionFromAPI() {
    return getRequest('/homePage/getAllDescription', 'GETALLDESCRIPTION')
}
export {
    getAllDescription,
    uploadImageDescriptionHomePage,
    updateDescriptionHomePage
}