import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";

async function getAllUsersFromAPI() {
    let answer = await getRequest('/users/get', 'GETALLUSERS')
    return answer
}

async function getAllUsers() {
    let answer = await getAllUsersFromAPI()
    return answer
}

async function getAllUsersAttente(){
    let answer = await getAllUsersAttenteFromAPI()
    return answer
}

async function getAllUsersAttenteFromAPI() {
    let answer = await getRequest('/users/getUserAttente', 'GETALLUSERSATTENTE')
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

async function acceptUser(id) {
    let answer = await acceptUserFromAPI(id)
    return answer
}

async function acceptUserFromAPI(id) {
    let answer = await postRequest('/users/acceptUser?id_user=' + id, 'ACCEPTUSER')
    return answer
}

async function refuseUser(id) {
    let answer = await refuseUserFromAPI(id)
    return answer
}

async function refuseUserFromAPI(id) {
    let answer = await postRequest('/users/refuseUser?id_user=' + id, 'REFUSEUSER')
    return answer
}

async function createUser(user) {
    let answer = await createUserFromAPI(user)
    return answer
}

async function createUserFromAPI(user) {
    let answer = await postRequest( '/users/create-user',user, 'CREATEUSER')
    return answer
}

async function registerClient(user) {
    let answer = await registerClientFromAPI(user)
    return answer
}

async function registerClientFromAPI(user) {
    let answer = await postRequest('/users/registerClient', user, 'REGISTERCLIENT')
    return answer
}

async function registerPrestataire(body) {
    let answer = await RegisterPrestaireFromAPI(body)
    return answer
}

async function RegisterPrestaireFromAPI(body) {
    let answer = await postRequest('/users/registerPrestataire', body, 'REGISTERPRESTATAIRE')
    return answer
}

async function updateUser(id, body) {
    let answer = await updateUserFromAPI(id, body)
    return answer
}

async function updateUserFromAPI(id, body) {
    return patchRequest('/users/update?id_user=' + id, body, 'UPDATEUSER')
}

async function deleteUser(id) {
    let answer = await deleteUserFromAPI(id)
    return answer
}

async function deleteUserFromAPI(id) {
    return deleteRequest('/users/delete?id_user='+ id, 'DELETEUSER')
}

async function updateSolde(body) {
    body = {solde: body}
    return await updateSoldeFromAPI(body)
}

async function updateSoldeFromAPI(body) {
    return patchRequest('/users/updateSolde',body, 'UPDATESOLDE')
}

async function updateUserCourantWoPassword(body) {
    let answer = await updateUserCourantWoPasswordFromAPI(body)
    return answer
}

async function updateUserCourantWoPasswordFromAPI(body) {
    return patchRequest('/users/updateUserCourantWoPassword', body, 'UPDATEUSERCOURANTWOPASSWORD')
}

async function getUserFromSessionIdFromAPI() {
    return await getRequest( '/users/getBySessionId', 'GETUSER_BY_SESSION_ID');
}

async function getUserFromSessionId() {
    return await getUserFromSessionIdFromAPI();
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