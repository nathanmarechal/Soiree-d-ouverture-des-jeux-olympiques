import {getRequest} from "@/services/axios.service";
//import LocalSource from "@/datasource/controller"

async function getAllAreasFromAPI() {
    return getRequest('/users', 'GETALLUSERS')
}

/*
async function getAllCharactersFromLocalSource() {
  return LocalSource.getAllCharacters()
}
*/

async function getAllUsers() {
    let answer = await getAllUsersFromAPI()
    //let answer = await getAllCharactersFromLocalSource()
    return answer
}

export {
    getAllUsers
}