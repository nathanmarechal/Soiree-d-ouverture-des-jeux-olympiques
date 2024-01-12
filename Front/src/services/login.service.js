import {getRequest} from "@/services/axios.service";

async function getSessionFromApi(userEmail,password) {
    return getRequest('/login?email='+userEmail+'&password='+password, 'LOGIN')
}

async function getSession(userEmail, password){
    let answer = await getSessionFromApi(userEmail,password)
    return answer;
}

export {
    getSession
}