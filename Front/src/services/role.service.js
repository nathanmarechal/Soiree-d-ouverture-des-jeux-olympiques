import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";


async function createRole(body) {
    let answer = await createRoleFromAPI(body)
    return answer
}

async function createRoleFromAPI(body) {
    let answer = await postRequest('/roles/add', body, 'CREATEROLE')
    return answer
}

async function deleteRole(id) {
    let answer = await deleteRolefromAPI(id)
    return answer
}

async function deleteRolefromAPI(id) {
    let answer = await deleteRequest('/roles/delete?id_role=' + id, 'DELETEROLE')
    return answer
}

async function updateRole(body) {
    let answer = await updateRoleFromAPI(body)
    return answer
}

async function updateRoleFromAPI(body) {
    let id = body.id_role
    let answer = patchRequest('/roles/update?id_role=' + id, body, 'UPDATEROLE')
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