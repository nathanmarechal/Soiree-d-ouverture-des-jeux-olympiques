import {getRequest} from "@/services/axios.service";

async function getAllStandsFromAPI() {
    let answer = await getRequest('/stands/get', 'GETALLUSERS')
    console.log("getAllStandsFromAPI: ", answer)
    return answer
}

async function getAllStands() {
    let answer = await getAllStandsFromAPI()
    console.log("getAllStands: ", answer)
    return answer
}

export {
    getAllStands,
}