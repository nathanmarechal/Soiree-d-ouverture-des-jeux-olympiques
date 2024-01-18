import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";


async function createRole(body, session_id) {
    let answer = await createRoleFromAPI(body, session_id)
    return answer
}

async function createRoleFromAPI(body, session_id) {
    let answer = await postRequest('/roles/add?session_id=' + session_id, body, 'CREATEROLE')
    return answer
}

async function deleteRole(id,session_id) {
    let answer = await deleteRolefromAPI(id,session_id)
    return answer
}

async function deleteRolefromAPI(id,session_id) {
    let answer = await deleteRequest('/roles/delete?id_role=' + id+"&session_id="+session_id, 'DELETEROLE')
    return answer
}

async function updateRole(body, session_id) {
    let answer = await updateRoleFromAPI(body, session_id)
    return answer
}

async function updateRoleFromAPI(body, session_id) {
    body.session_id = session_id
    let id = body.id_role
    let answer = patchRequest('/roles/update?session_id=' + session_id + '&id_role=' + id, body, 'UPDATEROLE')
    return answer
}



async function getAllRoles() {
    let answer = await getAllRolesFromAPI()
    return answer
}

async function getAllRolesFromAPI() {
    let answer = await getRequest('/roles/get', 'GETALLROLES')
    return answer
}


export {
    createRole,
    updateRole,
    getAllRoles,
    deleteRole
}