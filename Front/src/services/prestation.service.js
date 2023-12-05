import {getRequest, postRequest, postRequestPicture} from "@/services/axios.service";

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

async function getPrestationByUserIdFromAPI(id) {
    return getRequest('/prestations/get/' + id, 'GETPRESTATIONBYUSERID')
}

async function getPrestationByUserId(id) {
    let answer = await getPrestationByUserIdFromAPI(id)
    console.log("getPrestationByUserId: ", answer)
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
    //console.log("createZone: ", answer)
    return answer
}

async function createPrestationFromAPI(body) {
    console.log("createPrestationFromAPI: ", body)
    let answer = await postRequest('/users/roles', body, 'CREATEPRESTATION')
    return answer
}


export {
    getAllPrestations,
    getAllTypePrestations,
    getPrestationByUserId,
    uploadImagePresation,
    createPrestation
}