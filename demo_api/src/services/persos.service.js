import {getRequest} from "@/services/axios.service";
//import LocalSource from "@/datasource/controller"

async function getAllCharactersFromAPI() {
  return getRequest('/persos/get', 'GETALLPERSOS')
}

/*
async function getAllCharactersFromLocalSource() {
  return LocalSource.getAllCharacters()
}
*/

async function getAllCharacters() {
  let answer = await getAllCharactersFromAPI()
  //let answer = await getAllCharactersFromLocalSource()
  return answer
}

export {
  getAllCharacters
}