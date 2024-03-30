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

async function getNbPrestationHeureFromAPI() {
    return getRequest('/statistiques/prestataire/nb-prestation-heure', 'GETPRESTATAIREPRESTATIONBYHOURS')
}

async function getNbPrestationHeure() {
    let answer = await getNbPrestationHeureFromAPI()
    return answer
}

async function getAveragePurchaseByStandFromAPI() {
    return getRequest('/statistiques/prestataire/average-purchase', 'GETAVERAGEPURCHASEBUSTAND')
}

async function getAveragePurchaseByStand() {
    let answer = await getAveragePurchaseByStandFromAPI()
    return answer
}

async function getBestClientByStandFromAPI() {
    return getRequest('/statistiques/prestataire/best-client', 'BESTCLIENTBYSTAND')
}

async function getBestClientByStand() {
    let answer = await getBestClientByStandFromAPI()
    return answer
}

async function getSalesRevnueByTypeByStandFromAPI() {
    return getRequest('/statistiques/prestataire/sales-revenue-by-type', 'BESTSALESREVENUE')
}

async function getSalesRevnueByTypeByStand() {
    let answer = await getSalesRevnueByTypeByStandFromAPI()
    return answer
}
async function getAvgRatingByStandFromAPI() {
    return getRequest('/statistiques/prestataire/average-rating', 'BESTSALESREVENUE')
}

async function getAvgRatingByStand() {
    let answer = await getAvgRatingByStandFromAPI()
    return answer
}
async function getCountRatingByStandFromAPI() {
    return getRequest('/statistiques/prestataire/count-rating', 'BESTSALESREVENUE')
}

async function getCountRatingByStand() {
    let answer = await getCountRatingByStandFromAPI()
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