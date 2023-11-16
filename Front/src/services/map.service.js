import {getRequest} from "@/services/axios.service";
//import LocalSource from "@/datasource/controller"

async function getAllAreasFromAPI() {
    let answer = await getRequest('/map/areas', 'GETALLAREAS')
    console.log("getAllAreasFromAPI: ", answer)
    return answer
}

async function getAllAreas() {
    let answer = await getAllAreasFromAPI()
    console.log("getAllAreas: ", answer)
    return answer
}

async function getAllZonesFromAPI() {
    return getRequest('/map/zones', 'GETALLZONES')
}

async function getAllZones() {
    let answer = await getAllZonesFromAPI()
    console.log("getAllZones: ", answer)
    return answer
}

export {
    getAllAreas,
    getAllZones
}