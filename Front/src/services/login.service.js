import {getRequest} from "@/services/axios.service";
import sha256 from 'crypto-js/sha256';
async function getSessionFromApi(userEmail,passwordHash) {
    console.log("getSessionFromApi : "+passwordHash)
    return getRequest('/login?email='+userEmail+'&password='+passwordHash, 'LOGIN')
}

async function getSession(userEmail, password){
    const passwordHash = sha256(password).toString();
    let answer = await getSessionFromApi(userEmail,passwordHash)
    return answer;
}

export {
    getSession
}