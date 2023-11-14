import { rpgitems, towns, characters } from './rpg.data'

function getAllItems() {
  return {error: 0, status: 200, data: rpgitems}
}

function getAllTowns() {
  return {error: 0, status: 200, data: towns}
}

function getAllCharacters() {
  return {error: 0, status: 200, data: characters}
}
export default {
  getAllItems,
  getAllTowns,
  getAllCharacters ,
}