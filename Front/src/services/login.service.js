import {postRequest} from "@/services/axios.service";

async function getSessionFromApi(userEmail,password) {
    return postRequest('/login?email='+userEmail+'&password='+password, 'LOGIN')
}

async function getSession(userEmail, password){
    //console.log("getting a token for "+userEmail+", "+password);
    let answer = await getSessionFromApi(userEmail,password)
    //console.log("token : "+answer);
    return answer;
}

export {
    getSession
}