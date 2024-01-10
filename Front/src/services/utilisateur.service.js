import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";

async function getAllUsersFromAPI(session_id) {
    let answer = await getRequest('/users/get?session_id='+session_id, 'GETALLUSERS')
    return answer
}

async function getAllUsers(session_id) {
    let answer = await getAllUsersFromAPI(session_id)
    return answer
}

async function getAllUsersAttente(session_id){
    let answer = await getAllUsersAttenteFromAPI(session_id)
    return answer
}

async function getAllUsersAttenteFromAPI(session_id) {
    let answer = await getRequest('/users/getUserAttente?session_id='+session_id, 'GETALLUSERSATTENTE')
    return answer
}

async function getAllStandAttente(){
    let answer = await getAllStandAttenteFromAPI()
    return answer
}

async function getAllStandAttenteFromAPI() {
    let answer = await getRequest('/users/get-stands-attente', 'GETALLSTANDATTENTE')
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

async function createUser(user,session_id) {
    let answer = await createUserFromAPI(user,session_id)
    return answer
}

async function createUserFromAPI(user, session_id) {
    let answer = await postRequest( '/users/create-user?session_id='+session_id,user, 'CREATEUSER')
    return answer
}

async function registerClient(user, session_id) {
    let answer = await registerClientFromAPI(user, session_id)
    return answer
}

async function registerClientFromAPI(user, session_id) {
    let answer = await postRequest('/users/registerClient?session_id='+session_id, user, 'REGISTERCLIENT')
    return answer
}

async function registerPrestataire(body, session_id) {
    let answer = await RegisterPrestaireFromAPI(body, session_id)
    return answer
}

async function RegisterPrestaireFromAPI(body, session_id) {
    let answer = await postRequest('/users/registerPrestataire?session_id'+session_id, body, 'REGISTERPRESTATAIRE')
    return answer
}

async function updateUser(id, body, session_id) {
    let answer = await updateUserFromAPI(id, body, session_id)
    return answer
}

async function updateUserFromAPI(id, body, session_id) {
    return patchRequest('/users/update?session_id='+session_id + '&id_user=' + id, body, 'UPDATEUSER')
}

async function deleteUser(id,session_id) {
    let answer = await deleteUserFromAPI(id,session_id)
    return answer
}

async function deleteUserFromAPI(id,session_id) {
    return deleteRequest('/users/delete?id_user='+ id+"&session_id="+session_id, 'DELETEUSER')
}

async function updateSolde(session_id, id_user, body) {
    return await updateSoldeFromAPI(session_id, id_user, body)
}

async function updateSoldeFromAPI(session_id, id_user, body) {
    return patchRequest('/users/updateSolde?session_id='+session_id+'&id_user='+id_user, body, 'UPDATESOLDE')
}

async function updateUserCourantWoPassword(session_id, id, body) {
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
    registerClient,
    registerPrestataire,
    getAllUsersAttente,
    acceptUser,
    refuseUser,
    getAllStandAttente
}