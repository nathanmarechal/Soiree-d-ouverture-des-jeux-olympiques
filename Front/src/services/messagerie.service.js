import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllConversations(session_id) {
    let answer = await getAllConversationsFromAPI(session_id)

    return answer
}


async function getAllConversationsFromAPI(session_id) {
    let answer = await getRequest('/messagerie/get-all-conversations?session_id='+session_id, 'GETALLCONVERSATIONS')

    return answer
}

async function getConversationsForUser(session_id) {
    let answer = await getConversationsForUserFromAPI(session_id)

    return answer
}


async function getConversationsForUserFromAPI(session_id) {
    let answer = await getRequest('/messagerie/get-conversations-for-user?session_id='+session_id, 'GETALLCONVERSATIONS')
    return answer
}

async function getMessagesByConversation(id_conversation,session_id) {
    let answer = await getMessagesByConversationFromAPI(id_conversation,session_id)
    return answer
}


async function getMessagesByConversationFromAPI(id_conversation,session_id) {
    let answer = await getRequest('/messagerie/get-messages-by-conversation?id_conversation='
        +id_conversation+'&session_id='
        +session_id, 'GETMESSAGESBYCONVERSATION')
    return answer
}

async function sendMessage(session_id ,body){
    const answer = await sendMessageFromAPI(session_id, body)
    return answer
}

async function sendMessageFromAPI(session_id ,body){
    let answer = await postRequest('/messagerie/send-message?session_id='+ session_id, body, 'SENDMESSAGE')
    return answer
}

async function toggleResolvedConversationFromAPI(body, session_id) {
    return patchRequest('/messagerie/toggle-resolved-conversation?session_id=' + session_id, body, 'TOGGLERESOLVEDCONVERSATION')
}

async function toggleResolvedConversation(body, session_id) {
    let answer = await toggleResolvedConversationFromAPI(body, session_id)
    return answer
}

async function createConversation(body, session_id){
    const answer = await createConversationAsyncFromAPI(body, session_id)
    return answer
}

async function createConversationAsyncFromAPI(body, session_id){
    let answer = await postRequest('/messagerie/create-conversation?session_id='+ session_id, body)
    return answer
}


export {
    getAllConversations,
    getConversationsForUser,
    getMessagesByConversation,
    sendMessage,
    toggleResolvedConversation,
    createConversation
}
