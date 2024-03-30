import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllConversations(session_id) {
    let answer = await getAllConversationsFromAPI(session_id)

    return answer
}


async function getAllConversationsFromAPI() {
    let answer = await getRequest('/messagerie/get-all-conversations', 'GETALLCONVERSATIONS')

    return answer
}

async function getConversationsForUser() {
    let answer = await getConversationsForUserFromAPI()

    return answer
}


async function getConversationsForUserFromAPI() {
    let answer = await getRequest('/messagerie/get-conversations-for-user', 'GETALLCONVERSATIONS')
    return answer
}

async function getMessagesByConversation(id_conversation) {
    let answer = await getMessagesByConversationFromAPI(id_conversation)
    return answer
}


async function getMessagesByConversationFromAPI(id_conversation) {
    let answer = await getRequest('/messagerie/get-messages-by-conversation?id_conversation=' +id_conversation, 'GETMESSAGESBYCONVERSATION')
    return answer
}

async function sendMessage(body){
    const answer = await sendMessageFromAPI(body)
    return answer
}

async function sendMessageFromAPI(body){
    let answer = await postRequest('/messagerie/send-message', body, 'SENDMESSAGE')
    return answer
}

async function toggleResolvedConversationFromAPI(body) {
    return patchRequest('/messagerie/toggle-resolved-conversation=' , body, 'TOGGLERESOLVEDCONVERSATION')
}

async function toggleResolvedConversation(body) {
    let answer = await toggleResolvedConversationFromAPI(body)
    return answer
}

async function createConversation(body){
    const answer = await createConversationAsyncFromAPI(body)
    return answer
}

async function createConversationAsyncFromAPI(body){
    let answer = await postRequest('/messagerie/create-conversation', body)
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
