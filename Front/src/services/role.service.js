import { getRequest, postRequest, deleteRequest, patchRequest } from "@/services/axios.service";


async function createRole(body) {
    let answer = await createRoleFromAPI(body)
    //console.log("createZone: ", answer)
    return answer
}

async function createRoleFromAPI(body) {
    let answer = await postRequest('/roles/add', body, 'CREATEROLE')
    return answer
}

async function deleteRole(id) {
    let answer = await deleteRolefromAPI(id)
    console.log("deleteRole: ", answer)
    return answer
}

async function deleteRolefromAPI(id) {
    let answer = deleteRequest('/roles/delete/' + id, 'DELETEROLE')
    console.log("deleteRolefromAPI: ", answer)
    return answer
}

async function updateRole(body) {
    let answer = await updateRoleFromAPI(body)
    //console.log("updateRole: ", answer)
    return answer
}

async function updateRoleFromAPI(body) {
    let id = body.id_role
    let answer = patchRequest('/roles/update/' + id, body, 'UPDATEROLE')
    //console.log("updateRoleFromAPI: ", answer)
    return answer
}



async function getAllRoles(session_id) {
    let answer = await getAllRolesFromAPI(session_id)
    return answer
}

async function getAllRolesFromAPI(session_id) {
    let answer = await getRequest('/roles/get?session_id='+session_id, 'GETALLROLES')
    return answer
}


export {
    createRole,
    updateRole,
    getAllRoles,
    deleteRole
}