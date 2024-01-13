import {getRequest} from "@/services/axios.service";

async function getBestSellerPrestationFromAPI(session_id) {
    let answer = await getRequest('/statistiques/best-seller-prestation?session_id=' + session_id, 'GETBESTSELLERPRESTATION')
    return answer
}

async function getBestSellerPrestation(session_id) {
    let answer = await getBestSellerPrestationFromAPI(session_id)
    return answer
}

async function getNbUsersFromAPI(session_id) {
    let answer = await getRequest('/statistiques/nb-users?session_id=' + session_id, 'GETNBUSERS')
    return answer
}

async function getNbUsers(session_id) {
    let answer = await getNbUsersFromAPI(session_id)
    return answer
}


async function getNbStandsFromAPI(session_id) {
    let answer = await getRequest('/statistiques/nb-stands?session_id=' + session_id, 'GETNBSTANDS')
    return answer
}

async function getNbStands(session_id) {
    let answer = await getNbStandsFromAPI(session_id)
    return answer
}


async function getNbPrestationsAvailableFromAPI(session_id) {
    let answer = await getRequest('/statistiques/nb-prestations-available?session_id=' + session_id, 'GETPRESTATIONAVAILABLE')
    return answer
}

async function getNbPrestationsAvailable(session_id) {
    let answer = await getNbPrestationsAvailableFromAPI(session_id)
    return answer
}


async function getAveragePurchaseFromAPI(session_id) {
    let answer = await getRequest('/statistiques/average-purchase?session_id=' + session_id, 'GETPRESTATIONAVAILABLE')
    return answer
}

async function getAveragePurchase(session_id) {
    let answer = await getAveragePurchaseFromAPI(session_id)
    return answer
}


async function getTopSellerStandFromAPI(session_id) {
    let answer = await getRequest('/statistiques/top-seller-stand?session_id=' + session_id, 'GETPRESTATIONAVAILABLE')
    return answer
}

async function getTopSellerStand(session_id) {
    let answer = await getTopSellerStandFromAPI(session_id)
    return answer
}

async function getTopAvisStandFromAPI(session_id) {
    let answer = await getRequest('/statistiques/top-avis-stand?session_id=' + session_id, 'GETTOPAVISSTAND')
    return answer
}

async function getTopAvisStand(session_id) {
    let answer = await getTopAvisStandFromAPI(session_id)
    return answer
}

async function getNewStandByMonthFromAPI(session_id) {
    let answer = await getRequest('/statistiques/new-stand-by-month?session_id=' + session_id, 'GETNEWSTANDBYMONTH')
    return answer
}

async function getNewStandByMonth(session_id) {
    let answer = await getNewStandByMonthFromAPI(session_id)
    return answer
}

async function getNbPrestationHeureFromAPI(session_id) {
    return getRequest('/statistiques/prestataire/nb-prestation-heure?session_id=' + session_id, 'GETPRESTATAIREPRESTATIONBYHOURS')
}

async function getNbPrestationHeure(session_id) {
    let answer = await getNbPrestationHeureFromAPI(session_id)
    return answer
}

async function getAveragePurchaseByStandFromAPI(session_id) {
    return getRequest('/statistiques/prestataire/average-purchase?session_id=' + session_id, 'GETAVERAGEPURCHASEBUSTAND')
}

async function getAveragePurchaseByStand(session_id) {
    let answer = await getAveragePurchaseByStandFromAPI(session_id)
    return answer
}

async function getBestClientByStandFromAPI(session_id) {
    return getRequest('/statistiques/prestataire/best-client?session_id=' + session_id, 'BESTCLIENTBYSTAND')
}

async function getBestClientByStand(session_id) {
    let answer = await getBestClientByStandFromAPI(session_id)
    console.log("getBestClientByStand: ", answer)
    return answer
}

async function getSalesRevnueByTypeByStandFromAPI(session_id) {
    return getRequest('/statistiques/prestataire/sales-revenue-by-type?session_id=' + session_id, 'BESTSALESREVENUE')
}

async function getSalesRevnueByTypeByStand(session_id) {
    let answer = await getSalesRevnueByTypeByStandFromAPI(session_id)
    console.log("getSalesRevnueByTypeByStand: ", answer)
    return answer
}
async function getAvgRatingByStandFromAPI(session_id) {
    return getRequest('/statistiques/prestataire/average-rating?session_id=' + session_id, 'BESTSALESREVENUE')
}

async function getAvgRatingByStand(session_id) {
    let answer = await getAvgRatingByStandFromAPI(session_id)
    console.log("getSalesRevnueByTypeByStand: ", answer)
    return answer
}
async function getCountRatingByStandFromAPI(session_id) {
    return getRequest('/statistiques/prestataire/count-rating?session_id=' + session_id, 'BESTSALESREVENUE')
}

async function getCountRatingByStand(session_id) {
    let answer = await getCountRatingByStandFromAPI(session_id)
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