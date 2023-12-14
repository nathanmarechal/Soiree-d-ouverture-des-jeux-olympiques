import {getRequest} from "@/services/axios.service";


async function getDroitsRole(id_role){
    let answer = await getDroitsRoleFromApi(id_role)
    return answer;
}

async function getDroitsRoleFromApi(id_role) {

    return getRequest('/droits/get/' + id_role, 'GETDROITSUSERCOURANT')
}

export {
    getDroitsRole
}