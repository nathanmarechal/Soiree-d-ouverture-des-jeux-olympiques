import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllAreasFromAPI() {
    let answer = await getRequest('/map/get-all-areas', 'GETALLAREAS')
    return answer
}

async function getAllAreas() {
    let answer = await getAllAreasFromAPI()
    return answer
}

async function updateAreaFromAPI(id, body) {
    return patchRequest('/map/update-area?id_emplacement=' + id, body, 'UPDATEAREA')
}

async function updateArea(id, body) {
    let answer = await updateAreaFromAPI(id, body)
    return answer
}

async function createAreaFromAPI(body) {
    let answer = await postRequest('/map/create-area', body, 'CREATEAREA')
    return answer
}

async function createArea(body) {
    let answer = await createAreaFromAPI(body)
    return answer
}

async function deleteAreaFromAPI(id) {
    return deleteRequest('/map/delete-area?id_emplacement=' + id, 'DELETEAREA')
}

async function deleteArea(id) {
    let answer = await deleteAreaFromAPI(id)
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

async function updateZoneFromAPI(id, body) {
    return patchRequest('/map/update-zone?id_zone=' + id, body, 'UPDATEZONE')
}

async function updateZone(id, body) {
    let answer = await updateZoneFromAPI(id, body)
    return answer
}

async function createZoneFromAPI(body) {
    return postRequest('/map/create-zone', body, 'CREATEZONE')
}

async function createZone(body) {
    let answer = await createZoneFromAPI(body)
    return answer
}

async function deleteZoneFromAPI(id) {
    return deleteRequest('/map/delete-zone?id_zone=' + id, 'DELETEZONE')
}

async function deleteZone(id) {
    let answer = await deleteZoneFromAPI(id)
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