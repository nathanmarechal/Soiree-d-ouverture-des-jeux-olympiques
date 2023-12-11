import {getRequest} from "@/services/axios.service";

async function getBestSellerPrestationFromAPI() {
    let answer = await getRequest('/statistiques/best-seller-prestation', 'GETBESTSELLERPRESTATION')
    return answer
}

async function getBestSellerPrestation() {
    let answer = await getBestSellerPrestationFromAPI()
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

export {
    getBestSellerPrestation,
    getNewStandByMonth,
    getNbPrestationHeure
}