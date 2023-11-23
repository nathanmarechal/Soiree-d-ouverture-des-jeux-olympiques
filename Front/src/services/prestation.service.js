import {getRequest} from "@/services/axios.service";

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

export {
    getAllPrestations,
    getAllTypePrestations,
}