import {getRequest} from "@/services/axios.service";


async function getDroitsRole(id_role){
    let answer = await getDroitsRoleFromApi(id_role)
    return answer;
}

async function getDroitsRoleFromApi(id_role) {
    console.log("sending the get request...")
    return getRequest('/droits/getByIdRole/' + id_role, 'GETDROITSPARROLE')
}

export {
    getDroitsRole
}