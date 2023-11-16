import {getRequest} from "@/services/axios.service";

async function getAllUsersFromAPI() {
    let answer = await getRequest('/users', 'GETALLUSERS')
    console.log("getAllUsersFromAPI: ", answer)
    return answer
}

async function getAllUsers() {
    let answer = await getAllUsersFromAPI()
    console.log("getAllUsers: ", answer)
    return answer
}

export {
    getAllUsers
}