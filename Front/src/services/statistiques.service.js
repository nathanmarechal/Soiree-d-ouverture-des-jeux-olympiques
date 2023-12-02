import {getRequest} from "@/services/axios.service";

async function getBestSellerPrestationFromAPI() {
    let answer = await getRequest('/statistiques/best-seller-prestation', 'GETALLUSERS')
    return answer
}

async function getBestSellerPrestation() {
    let answer = await getBestSellerPrestationFromAPI()
    return answer
}


export {
    getBestSellerPrestation
}