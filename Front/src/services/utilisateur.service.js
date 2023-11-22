import {getRequest, postRequest} from "@/services/axios.service";

async function getAllUsersFromAPI() {
    let answer = await getRequest('/users/get', 'GETALLUSERS')
    //console.log("getAllUsersFromAPI: ", answer)
    return answer
}

async function getAllUsers() {
    let answer = await getAllUsersFromAPI()
    //console.log("getAllUsers: ", answer)
    return answer
}
/*
async function createUserFromAPI(user) {
    let answer = await postRequest('/users/post', user, 'CREATEUSER')
    console.log("createUserFromAPI: ", answer)
    return answer
}

async function createUser(user) {
    let answer = await createUserFromAPI(user)
    console.log("createUser: ", answer)
    return answer
 */

async function createUser(user) {
    //console.log("createUser: ", user)
    let answer = await createUserAsync(user)
    return answer
}

async function createUserAsync(user) {
    //console.log("createUserAsync: ", user)
    return postRequest('/users/post', user, 'CREATEUSER')
}


async function getAllRoles() {
    let answer = await getAllRolesFromAPI()
    //console.log("getAllRoles: ", answer)
    return answer
}

async function getAllRolesFromAPI() {
    let answer = await getRequest('/users/roles', 'GETALLROLES')
    //console.log("getAllRolesFromAPI: ", answer)
    return answer
}


export {
    createUser,
    getAllRoles,
    getAllUsers,
}