import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";

async function getAllUsersFromAPI(session_id) {
    console.log("sessionid front bg :"+session_id)
    let answer = await getRequest('/users/get?session_id='+session_id, 'GETALLUSERS')
    //console.log("getAllUsersFromAPI: ", answer)
    return answer
}

async function getAllUsers(session_id) {
    let answer = await getAllUsersFromAPI(session_id)
    //console.log("getAllUsers: ", answer)
    return answer
}

async function getAllUsersAttente(){
    let answer = await getAllUsersAttenteFromAPI()
    //console.log("getAllUsers: ", answer)
    return answer
}

async function getAllUsersAttenteFromAPI() {
    let answer = await getRequest('/users/getUserAttente', 'GETALLUSERSATTENTE')
    return answer
}

async function acceptUser(id,session_id) {
    let answer = await acceptUserFromAPI(id,session_id)
    return answer
}

async function acceptUserFromAPI(id,session_id) {
    let answer = await postRequest('/users/acceptUser?id_user=' + id+'&session_id='+session_id, 'ACCEPTUSER')
    return answer
}

async function refuseUser(id,session_id) {
    let answer = await refuseUserFromAPI(id,session_id)
    return answer
}

async function refuseUserFromAPI(id,session_id) {
    let answer = await postRequest('/users/refuseUser?id_user=' + id+"&session_id="+session_id, 'REFUSEUSER')
    return answer
}

async function createUserFromAPI(user) {
    let answer = await postRequest( '/users/registerClient',user, 'CREATEUSER')
    console.log("createUserFromAPI: ", answer)
    return answer
}

async function createUserWithStand(body) {
    let answer = await createUserWithStandFromAPI(body)
    return answer
}

async function createUserWithStandFromAPI(body) {
    let answer = await postRequest('/users/registerPrestataire', body, 'CREATEUSERWITHSTAND')
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

async function deleteUser(id,session_id) {
    console.log("about to deleteUserFromAPI")
    let answer = await deleteUserFromAPI(id,session_id)
    //console.log("deleteUser: ", answer)
    return answer
}

async function deleteUserFromAPI(id,session_id) {
    console.log("deleteUserFromAPI my dudes: ", id,session_id)
    return deleteRequest('/users/delete?id_user='+ id+"&session_id="+session_id, 'DELETEUSER')
}

async function updateSolde(body) {
    return patchRequest('/users/updateSolde', body, 'UPDATESOLDE')
}

async function updateUserCourantWoPassword( session_id,id, body) {
    let answer = await updateUserCourantWoPasswordFromAPI(session_id,id, body)
    return answer
}

async function updateUserCourantWoPasswordFromAPI(session_id, id, body) {
    return patchRequest('/users/updateUserCourantWoPassword?session_id='+session_id + '&id_user='+id, body, 'UPDATEUSERCOURANTWOPASSWORD')
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
    updateUserCourantWoPassword,
    createUserWithStand,
    getAllUsersAttente,
    acceptUser,
    refuseUser
}