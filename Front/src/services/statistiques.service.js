import {getRequest} from "@/services/axios.service";

async function getBestSellerPrestationFromAPI() {
    let answer = await getRequest('/statistiques/best-seller-prestation', 'GETBESTSELLERPRESTATION')
    return answer
}

async function getBestSellerPrestation() {
    let answer = await getBestSellerPrestationFromAPI()
    return answer
}

async function getNbUsersFromAPI() {
    let answer = await getRequest('/statistiques/nb-users', 'GETNBUSERS')
    return answer
}

async function getNbUsers() {
    let answer = await getNbUsersFromAPI()
    return answer
}


async function getNbStandsFromAPI() {
    let answer = await getRequest('/statistiques/nb-stands', 'GETNBSTANDS')
    return answer
}

async function getNbStands() {
    let answer = await getNbStandsFromAPI()
    return answer
}


async function getNbPrestationsAvailableFromAPI() {
    let answer = await getRequest('/statistiques/nb-prestations-available', 'GETPRESTATIONAVAILABLE')
    return answer
}

async function getNbPrestationsAvailable() {
    let answer = await getNbPrestationsAvailableFromAPI()
    return answer
}


async function getAveragePurchaseFromAPI() {
    let answer = await getRequest('/statistiques/average-purchase', 'GETPRESTATIONAVAILABLE')
    return answer
}

async function getAveragePurchase() {
    let answer = await getAveragePurchaseFromAPI()
    return answer
}


async function getTopSellerStandFromAPI() {
    let answer = await getRequest('/statistiques/top-seller-stand', 'GETPRESTATIONAVAILABLE')
    return answer
}

async function getTopSellerStand() {
    let answer = await getTopSellerStandFromAPI()
    return answer
}

async function getTopAvisStandFromAPI() {
    let answer = await getRequest('/statistiques/top-avis-stand', 'GETTOPAVISSTAND')
    return answer
}

async function getTopAvisStand() {
    let answer = await getTopAvisStandFromAPI()
    return answer
}

async function getNewStandByMonthFromAPI() {
    let answer = await getRequest('/statistiques/new-stand-by-month', 'GETNEWSTANDBYMONTH')
    return answer
}

async function getNewStandByMonth() {
    let answer = await getNewStandByMonthFromAPI()
    return answer
}

async function getNbPrestationHeureFromAPI(id) {
    return getRequest('/statistiques/prestataire/nb-prestation-heure/' + id, 'GETPRESTATAIREPRESTATIONBYHOURS')
}

async function getNbPrestationHeure(id) {
    let answer = await getNbPrestationHeureFromAPI(id)
    console.log("getPrestationByUserId: ", answer)
    return answer
}

async function getAveragePurchaseByStandFromAPI(id) {
    return getRequest('/statistiques/prestataire/average-purchase/' + id, 'GETAVERAGEPURCHASEBUSTAND')
}

async function getAveragePurchaseByStand(id) {
    let answer = await getAveragePurchaseByStandFromAPI(id)
    console.log("getAveragePurchaseByStand: ", answer)
    return answer
}

async function getBestClientByStandFromAPI(id) {
    return getRequest('/statistiques/prestataire/best-client/' + id, 'BESTVLIENTBYSTAND')
}

async function getBestClientByStand(id) {
    let answer = await getBestClientByStandFromAPI(id)
    console.log("getBestClientByStand: ", answer)
    return answer
}

async function getSalesRevnueByTypeByStandFromAPI(id) {
    return getRequest('/statistiques/prestataire/sales-revenue-by-type/' + id, 'BESTSALESREVENUE')
}

async function getSalesRevnueByTypeByStand(id) {
    let answer = await getSalesRevnueByTypeByStandFromAPI(id)
    console.log("getSalesRevnueByTypeByStand: ", answer)
    return answer
}
async function getAvgRatingByStandFromAPI(id) {
    return getRequest('/statistiques/prestataire/average-rating/' + id, 'BESTSALESREVENUE')
}

async function getAvgRatingByStand(id) {
    let answer = await getAvgRatingByStandFromAPI(id)
    console.log("getSalesRevnueByTypeByStand: ", answer)
    return answer
}
async function getCountRatingByStandFromAPI(id) {
    return getRequest('/statistiques/prestataire/count-rating/' + id, 'BESTSALESREVENUE')
}

async function getCountRatingByStand(id) {
    let answer = await getCountRatingByStandFromAPI(id)
    console.log("getSalesRevnueByTypeByStand: ", answer)
    return answer
}



export {
    getBestSellerPrestation,
    getNewStandByMonth,
    getNbPrestationHeure,
    getAveragePurchaseByStand,
    getBestClientByStand,
    getSalesRevnueByTypeByStand,
    getAvgRatingByStand,
    getCountRatingByStand,
    getNbStands,
    getNbPrestationsAvailable,
    getNbUsers,
    getAveragePurchase,
    getTopSellerStand,
    getTopAvisStand,
}