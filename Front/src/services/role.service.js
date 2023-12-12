import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";


async function createRole(body) {
    let answer = await createRoleFromAPI(body)
    //console.log("createZone: ", answer)
    return answer
}

async function createRoleFromAPI(body) {
    let answer = await postRequest('/roles/create-role', body, 'CREATEROLE')
    return answer
}

async function deleteRole(id) {
    let answer = await deleteRolefromAPI(id)
    return answer
}

async function deleteRolefromAPI(id) {
    return deleteRequest('/roles/delete-role/' + id, 'DELETEROLE')
}

async function updateRole(body) {
    let answer = await updateRoleFromAPI(body)
    //console.log("updateZone: ", answer)
    return answer
}

async function updateRoleFromAPI(body) {
    let id = body.id_role
    return patchRequest('/roles/update-role/' + id, body, 'UPDATEROLE')
}



async function getAllRoles(session_id) {
    let answer = await getAllRolesFromAPI(session_id)
    return answer
}

async function getAllRolesFromAPI(session_id) {
    let answer = await getRequest('/roles/get-role?session_id='+session_id, 'GETALLROLES')
    return answer
}


export {
    createRole,
    updateRole,
    getAllRoles,
    deleteRole
}