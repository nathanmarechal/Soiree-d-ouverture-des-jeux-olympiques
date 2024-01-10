import {getRequest} from "@/services/axios.service";

async function getAllDroits(){
    let answer = await getAllDroitsFromApi()
    return answer;
}

async function getAllDroitsFromApi() {
    return getRequest('/droits/get', 'GETALLDROITS')
}

export {
    getAllDroits
}

