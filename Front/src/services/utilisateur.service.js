import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";

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

async function createUserFromAPI(user) {
    let answer = await postRequest('/users/', user, 'CREATEUSER')
    console.log("createUserFromAPI: ", answer)
    return answer
}

async function createUser(user) {
    let answer = await createUserFromAPI(user)
    console.log("createUser: ", answer)
    return answer
}

async function updateUser(id, body) {
    console.log("updateUserFrom3: ", body)
    let answer = await updateUserFromAPI(id, body)
    //console.log("updateUser: ", answer)
    return answer
}

async function updateUserFromAPI(id, body) {
    console.log("updateUserFromAPI3: ", body)
    return patchRequest('/users/update/' + id, body, 'UPDATEUSER')
}

async function deleteUser(id) {
    let answer = await deleteUserFromAPI(id)
    //console.log("deleteUser: ", answer)
    return answer
}

async function deleteUserFromAPI(id) {
    return deleteRequest('/users/delete/' + id, id, 'DELETEUSER')
}

async function createRole(body) {
    let answer = await createRoleFromAPI(body)
    //console.log("createZone: ", answer)
    return answer
}

async function createRoleFromAPI(body) {
    console.log("createRoleFromAPI: ", body)
    let answer = await postRequest('/users/roles', body, 'CREATEROLE')
    return answer
}

async function deleteRole(id) {
    console.log("deleteRoleInFront: ", id)
    let answer = await deleteRolefromAPI(id)
    return answer
}

async function deleteRolefromAPI(id) {
    return deleteRequest('/users/roles/' + id, id, 'DELETEROLE')
}

async function updateRole(body) {
    let answer = await updateRoleFromAPI(body)
    //console.log("updateZone: ", answer)
    return answer
}

async function updateRoleFromAPI(body) {
    return patchRequest('/users/roles/' + body.id_role, body, 'UPDATEROLE')
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

async function getUserFromSessionId(session_id) {
    return await getUserFromSessionIdFromAPI(session_id);
}

export {
    createUser,
    createRole,
    deleteUser,
    deleteRole,
    updateUser,
    updateRole,
    getAllRoles,
    getAllUsers,
    getUserFromSessionId
}