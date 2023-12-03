import {getRequest} from "@/services/axios.service";

async function getBestSellerPrestationFromAPI() {
    let answer = await getRequest('/statistiques/best-seller-prestation', 'GETBESTSELLERPRESTATION')
    return answer
}

async function getBestSellerPrestation() {
    let answer = await getBestSellerPrestationFromAPI()
    return answer
}

async function getNewStandByMounthFromAPI() {
    let answer = await getRequest('/statistiques/new-stand-by-mounth', 'GETNEWSTANDBYMOUNTH')
    return answer
}

async function getNewStandByMounth() {
    let answer = await getNewStandByMounthFromAPI()
    return answer
}


export {
    getBestSellerPrestation,
    getNewStandByMounth
}