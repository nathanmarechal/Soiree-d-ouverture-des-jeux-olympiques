import {getRequest, patchRequest} from "@/services/axios.service"
//import LocalSource from "@/datasource/controller"

async function getAllItemsFromAPI() {
  return getRequest('/items/get', 'GETALLITEMS')
}

/*
async function getAllItemsFromLocalSource() {
 return LocalSource.getAllItems()
}
 */

async function getItemByIdFromAPI(id) {
  return getRequest('/items/getbyid/'+id, 'GETITEMBYID')
}

async function getItemByNameFromAPI(name) {
  return getRequest('/items/getbyname/'+name, 'GETITEMBYNAME')
}

async function updateItemPriceFromAPI(id, price) {
  let data = {
    id: id,
    price: price,
  }
  return patchRequest('/items/updateprice', data, 'UPDATEITEMPRICE')
}

async function getAllItems() {
  let answer = await getAllItemsFromAPI()
  //let answer = await getAllItemsFromLocalSource()
  return answer
}

async function getItemById(id) {

  let answer = await getItemByIdFromAPI(id)
  return answer
}

async function getItemByName(name) {

  let answer = await getItemByNameFromAPI(name)
  return answer
}

async function updateItemPrice(id, price) {

  let answer = await updateItemPriceFromAPI(id, price)
  return answer
}

export {
  getAllItems,
  getItemById,
  getItemByName,
  updateItemPrice,
}