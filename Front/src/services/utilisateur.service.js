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

async function createUserFromAPI(user,session_id) {
    const url = '/users?session_id='+session_id;
    console.log("url,usr=",url,user)
    let answer = await postRequest(url, user, 'CREATEUSER')
    console.log("createUserFromAPI: ", answer)
    return answer
}

async function createUser(user,session_id) {

    let answer = await createUserFromAPI(user,session_id)
//    console.log("createUser: ", answer)
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
    console.log("deleteUserFromAPI: ", id)
    return deleteRequest('/users/delete/'+ id, 'DELETEUSER')
}

async function updateSolde(body) {
    return patchRequest('/users/updateSolde', body, 'UPDATESOLDE')
}

async function updateNom(body) {
    return patchRequest('/users/updateNom', body, 'UPDATENOM')
}

async function updatePrenom(body) {
    return patchRequest('/users/updatePrenom', body, 'UPDATEPRENOM')
}

async function updateEmail(body) {
    return patchRequest('/users/updateEmail', body, 'UPDATEEMAIL')

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
    deleteUser,
    updateUser,

    getAllUsers,
    getUserFromSessionId,
    updateSolde,
    updateNom,
    updatePrenom,
    updateEmail
}