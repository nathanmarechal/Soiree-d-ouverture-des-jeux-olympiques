import {getRequest , postRequest , deleteRequest} from "@/services/axios.service";


async function getAllRoleDroitAssociation(){
    let answer = await getAllRoleDroitAssociationFromApi()
    return answer;
}

async function getAllRoleDroitAssociationFromApi() {
    return getRequest('/role-droit/get', 'GETALLROLEDROITASSOCIATION')
}

async function createRoleDroitAssociation(role_droit) {
    let answer = await createRoleDroitAssociationFromApi(role_droit)
    console.log("createRoleDroitAssociation: ", answer)
    return answer;
}

async function createRoleDroitAssociationFromApi(role_droit) {
    return postRequest('/role-droit/add', role_droit, 'CREATEROLEDROITASSOCIATION')
}

async function deleteRoleDroitAssociation(role_droit) {
    let answer = await deleteRoleDroitAssociationFromApi(role_droit)
    return answer;
}

async function deleteRoleDroitAssociationFromApi(role_droit) {
    return deleteRequest('/role-droit/delete', role_droit, 'DELETEROLEDROITASSOCIATION')
}


export {
    getAllRoleDroitAssociation,
    createRoleDroitAssociation,
    deleteRoleDroitAssociation
}