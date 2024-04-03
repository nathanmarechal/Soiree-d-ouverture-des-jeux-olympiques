import {getRequest, postRequest} from "@/services/axios.service";
import sha256 from 'crypto-js/sha256';
async function getSessionFromApi(userEmail,passwordHash) {
    console.log("getSessionFromApi : "+passwordHash)
    return getRequest('/login?email='+userEmail+'&password='+passwordHash, 'LOGIN')
}

async function getSession(userEmail, password){
    let answer = await getSessionFromApi(userEmail,password)
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
    console.log("logout");
    return postRequest('/login/logout', 'LOGOUT')
}

export {
    getSession,
    getSessionCookies,
    logout
}