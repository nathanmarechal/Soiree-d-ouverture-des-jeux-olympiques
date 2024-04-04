import {getRequest} from "@/services/axios.service";
import sha256 from 'crypto-js/sha256';
async function getSessionFromApi(userEmail,passwordHash) {
    return getRequest('/login?email='+userEmail+'&password='+passwordHash, 'LOGIN')
}

async function getSession(userEmail, password){
    const passwordHash = sha256(password).toString();
    let answer = await getSessionFromApi(userEmail,passwordHash)
    return answer; 
}

async function getSessionCookiesFromApi(){
    return getRequest('/login/cookies', 'LOGIN')
}

async function getSessionCookies(){
    let answer = await getSessionCookiesFromApi()
    return answer;
}

async function logout(){
    return getRequest('/login/logout', 'LOGOUT')
}

export {
    getSession,
    getSessionCookies,
    logout
}