import {getRequest, postRequest} from "@/services/axios.service";

async function getAllUsersFromAPI(session_id) {
    let answer = await getRequest('/users/get?session_id='+session_id, 'GETALLUSERS')
    //console.log("getAllUsersFromAPI: ", answer)
    return answer
}

async function getAllUsers(session_id) {
    let answer = await getAllUsersFromAPI(session_id)
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

async function createUser(user,session_id) {
    console.log("createUser: ", user)
    let answer = await createUserAsync(user,session_id)
    return answer
}

async function createUserAsync(user,session_id) {
    //console.log("createUserAsync: ", user)
    return postRequest('/users/post?session_id='+session_id, user, 'CREATEUSER')
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

async function getUserFromSessionIdFromAPI(session_id) {
    const request = '/users/getBySessionId?session_id='+session_id;
    return await getRequest(request, 'GETUSER_BY_SESSION_ID');
}
async function getUserFromSessionId(session_id)
{
    return await getUserFromSessionIdFromAPI(session_id);
}

export {
    createUser,
    getAllRoles,
    getAllUsers,
    getUserFromSessionId
}