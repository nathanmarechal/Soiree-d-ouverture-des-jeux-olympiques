import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllAreasFromAPI() {
    let answer = await getRequest('/map/get-all-areas', 'GETALLAREAS')
    return answer
}

async function getAllAreas() {
    let answer = await getAllAreasFromAPI()
    return answer
}

async function updateAreaFromAPI(id, body, session_id) {
    return patchRequest('/map/update-area?session_id=' + session_id + '&id_emplacement=' + id, body, 'UPDATEAREA')
}

async function updateArea(id, body, session_id) {
    let answer = await updateAreaFromAPI(id, body, session_id)
    return answer
}

async function createAreaFromAPI(body, session_id) {
    let answer = await postRequest('/map/create-area?session_id=' + session_id, body, 'CREATEAREA')
    return answer
}

async function createArea(body, session_id) {
    let answer = await createAreaFromAPI(body, session_id)
    return answer
}

async function deleteAreaFromAPI(id, session_id) {
    return deleteRequest('/map/delete-area?session_id=' + session_id + '&id_emplacement=' + id, 'DELETEAREA')
}

async function deleteArea(id, session_id) {
    let answer = await deleteAreaFromAPI(id, session_id)
    return answer
}

async function getAllZonesFromAPI() {
    return getRequest('/map/get-all-zones', 'GETALLZONES')
}

async function getAllZones() {
    let answer = await getAllZonesFromAPI()
    return answer
}

async function getZoneByIdFromAPI(id) {
    return getRequest('/map/get-zone?id_zone=' + id, 'GETZONEBYID')
}

async function getZoneById(id) {
    let answer = await getZoneByIdFromAPI(id)
    return answer
}

async function updateZoneFromAPI(id, body, session_id) {
    return patchRequest('/map/update-zone?session_id=' + session_id + '&id_zone=' + id, body, 'UPDATEZONE')
}

async function updateZone(id, body, session_id) {
    let answer = await updateZoneFromAPI(id, body, session_id)
    return answer
}

async function createZoneFromAPI(body, session_id) {
    return postRequest('/map/create-zone?session_id=' + session_id, body, 'CREATEZONE')
}

async function createZone(body, session_id) {
    let answer = await createZoneFromAPI(body, session_id)
    return answer
}

async function deleteZoneFromAPI(id,session_id) {
    return deleteRequest('/map/delete-zone?id_zone=' + id+"&session_id="+session_id, 'DELETEZONE')
}

async function deleteZone(id,session_id) {
    let answer = await deleteZoneFromAPI(id,session_id)
    return answer
}

async function getAllTypeZonesFromAPI() {
    return getRequest('/map/get-all-type-zones', 'GETALLTYPEZONE')
}

async function getAllTypeZones() {
    let answer = await getAllTypeZonesFromAPI()
    return answer
}

export {
    getAllAreas,
    getAllZones,
    getAllTypeZones,
    updateZone,
    createZone,
    deleteZone,
    getZoneById,
    updateArea,
    createArea,
    deleteArea
}