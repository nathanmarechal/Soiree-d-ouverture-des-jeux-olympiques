import {getRequest} from "@/services/axios.service";

async function getAvisByIdStand(id_stand){
    let answer = await getAvisByIdStandAsync(id_stand)
    return answer;
}

async function getAvisByIdStandAsync(id_stand) {
    return getRequest('/avis/getAvisByIdStand/' + id_stand, 'GETAVISBYIDSTAND')
}


export {
    getAvisByIdStand
}