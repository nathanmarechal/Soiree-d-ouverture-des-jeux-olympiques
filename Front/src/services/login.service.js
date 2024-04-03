import {getRequest, postRequest} from "@/services/axios.service";

async function getSessionFromApi(userEmail,password) {
    return getRequest('/login?email='+userEmail+'&password='+password, 'LOGIN')
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