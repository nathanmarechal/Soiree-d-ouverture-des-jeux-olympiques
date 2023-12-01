import {getRequest,postRequestPicture} from "@/services/axios.service";

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


async function uploadImageDescriptionStandFromAPI(image){
    return postRequestPicture('/stands/upload/picture-description/',image, 'UPLOADPICTUREDESCRIPTIONSTAND')
}

async function uploadImageDescriptionStand(image) {
    let answer = await uploadImageDescriptionStandFromAPI(image);
    return answer;
}

export {
    getAllStands,
    uploadImageDescriptionStand
}