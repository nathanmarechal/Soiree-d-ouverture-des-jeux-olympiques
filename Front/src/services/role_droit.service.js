import {getRequest , postRequest , deleteRequest} from "@/services/axios.service";


async function getAllRoleDroitAssociation(){
    let answer = await getAllRoleDroitAssociationFromApi()
    return answer;
}

async function getAllRoleDroitAssociationFromApi() {
    return getRequest('/role-droit/get', 'GETALLROLEDROITASSOCIATION')
}

async function createRoleDroitAssociation(role_droit, session_id) {
    let answer = await createRoleDroitAssociationFromApi(role_droit, session_id)
    console.log("createRoleDroitAssociation: ", answer)
    return answer;
}

async function createRoleDroitAssociationFromApi(role_droit, session_id) {
    let answer = await postRequest('/role-droit/add?session_id=' + session_id, role_droit, 'CREATEROLEDROITASSOCIATION')
    console.log("createRoleDroitAssociationFromApi: ", answer)
    return answer;
}

async function deleteRoleDroitAssociation(role_droit, session_id) {
    let answer = await deleteRoleDroitAssociationFromApi(role_droit, session_id)
    console.log("deleteRoleDroitAssociation: ", answer)
    return answer;
}

async function deleteRoleDroitAssociationFromApi(role_droit, session_id) {
    let answer = deleteRequest('/role-droit/delete?session_id=' + session_id, role_droit, 'DELETEROLEDROITASSOCIATION')
    console.log("deleteRoleDroitAssociationFromApi: ", answer)
    return answer;
}

async function deleteRoleDroitAssociationForSpecificRole(id_role, session_id) {
    let answer = await deleteRoleDroitAssociationForSpecificRoleFromApi(id_role, session_id)
    return answer;
}

async function deleteRoleDroitAssociationForSpecificRoleFromApi(id_role, session_id) {
    let answer = deleteRequest('/role-droit/delete?id_role=' + id_role + '&session_id=' + session_id, 'DELETEROLEDROITASSOCIATIONFORSPECIFICROLE')
    return answer;
}


export {
    getAllRoleDroitAssociation,
    createRoleDroitAssociation,
    deleteRoleDroitAssociation,
    deleteRoleDroitAssociationForSpecificRole
}