const pool = require("../database/db");

async function getAllConversationsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT
    conversations.id_conversation,
    id_creator,
    titre,
    resolu,
    utilisateur.email AS email_creator,
    COUNT(messages.id_conversation) AS nb_messages,
    MAX(messages.temps_emmission) as dernier_message
    FROM
        conversations
    LEFT JOIN
        messages ON conversations.id_conversation = messages.id_conversation
    LEFT JOIN
        utilisateur ON conversations.id_creator = utilisateur.id_user
    GROUP BY
        conversations.id_conversation, utilisateur.email
    ORDER BY
        resolu ASC, -- false (non résolu) en premier
        CASE WHEN MAX(messages.temps_emmission) IS NULL THEN 1 ELSE 0 END, -- Conversations sans messages en dernier
        dernier_message DESC;`);
            conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConversationsAsync:', error);
        throw error;
    }
}

const getAllConversations = (callback) => {
    getAllConversationsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getConversationsForUserAsync(id_user) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(
            "SELECT conversations.id_conversation, titre, resolu,\n" +
            " COUNT(*) AS nb_messages\n" +
            "FROM conversations\n" +
            "LEFT JOIN messages ON conversations.id_conversation = messages.id_conversation\n" +
            "LEFT JOIN utilisateur on conversations.id_creator = utilisateur.id_user\n" +
            "WHERE id_creator = $1 AND resolu=false\n" +
            "GROUP BY conversations.id_conversation, utilisateur.email\n" +
            ";",[id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConversationsAsync:', error);
        throw error;
    }
}

const getConversationsForUser = (id_user,callback) => {
    getConversationsForUserAsync(id_user)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getMessagesByConversationAsync(id_conversation) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(
            "SELECT id_sender, message, temps_emmission, concat(u.prenom, ' ', u.nom) as name, u.email\n" +
            "FROM messages\n" +
            "LEFT JOIN  utilisateur u on messages.id_sender = u.id_user\n" +
            "WHERE id_conversation = $1 "+
            "ORDER BY temps_emmission\n" +
            ";",[id_conversation]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConversationsAsync:', error);
        throw error;
    }
}

const getMessagesByConversation = (id_conversation,callback) => {
    getMessagesByConversationAsync(id_conversation)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function sendMessageAsync(id_conversation, message, id_user) {
    try {
        const conn = await pool.connect();

        await conn.query(
            "INSERT INTO messages(id_sender, id_conversation, message, temps_emmission) VALUES ($1, $2, $3, now());",
            [id_user, id_conversation, message]
        );

        const result = await conn.query(
            "SELECT id_sender, message, temps_emmission, concat(u.prenom, ' ', u.nom) as name, u.email " +
            "FROM messages " +
            "LEFT JOIN utilisateur u on messages.id_sender = u.id_user " +
            "WHERE id_conversation = $1 AND id_sender = $2 " +
            "ORDER BY temps_emmission DESC LIMIT 1;",
            [id_conversation, id_user]
        );
        conn.release();

        return result.rows[0];

    } catch (error) {
        console.error('Error in sendMessageAsync:', error);
        throw error;
    }
}

const sendMessage = (id_conversation,message,id_user,callback) => {
    sendMessageAsync(id_conversation,message,id_user)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createConversationAsync(message, id_user) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`INSERT INTO conversations (id_creator, titre, resolu)
                                         VALUES ($1, $2, false) RETURNING *;
        `,[id_user,message]);
        conn.release();
        return result.rows;

    } catch (error) {
        console.error('Error in sendMessageAsync:', error);
        throw error;
    }
}

const createConversation = (message,id_user,callback) => {
    createConversationAsync(message,id_user)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


async function toggleResolvedConversationAsync(id_conversation) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`
                UPDATE conversations
                SET resolu = true
                WHERE id_conversation = $1;`,[id_conversation]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in toggleResolvedConversationAsync:', error);
        throw error;
    }
}

const toggleResolvedConversation = (id_conversation,callback) => {
    toggleResolvedConversationAsync(id_conversation)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getAllConversations: getAllConversations,
    getConversationsForUser:getConversationsForUser,
    getMessagesByConversation:getMessagesByConversation,
    sendMessage:sendMessage,
    toggleResolvedConversation,
    createConversation
}