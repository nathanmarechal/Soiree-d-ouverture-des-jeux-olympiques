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
    let answer = await postRequest('/role-droit/add', role_droit, 'CREATEROLEDROITASSOCIATION')
    console.log("createRoleDroitAssociationFromApi: ", answer)
    return answer;
}

async function deleteRoleDroitAssociation(role_droit) {
    let answer = await deleteRoleDroitAssociationFromApi(role_droit)
    return answer;
}

async function deleteRoleDroitAssociationFromApi(role_droit) {
    let answer = deleteRequest('/role-droit/delete', role_droit, 'DELETEROLEDROITASSOCIATION')
    return answer;
}


export {
    getAllRoleDroitAssociation,
    createRoleDroitAssociation,
    deleteRoleDroitAssociation
}