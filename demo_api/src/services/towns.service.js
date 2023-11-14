import {getRequest} from "@/services/axios.service";
//import LocalSource from "@/datasource/controller"

async function getAllTownsFromAPI() {
  return getRequest('/towns/get', 'GETALLTOWNS')
}

/*
async function getAllTownsFromLocalSource() {
  return LocalSource.getAllTowns()
}
*/

async function getAllTowns() {
  let answer = await getAllTownsFromAPI()
  //let answer = await getAllTownsFromLocalSource()
  return answer
}

export {
  getAllTowns
}