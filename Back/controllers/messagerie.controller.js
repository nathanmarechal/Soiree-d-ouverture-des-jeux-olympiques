const messagerieService = require("../services/messagerie.service");
const usersService = require("../services/users.service");

exports.getConversations = (req, res) => {
    messagerieService.getAllConversations((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getConversationsForUser = async (req, res) => {
    const session_id = req.query.session_id;

    const user = await usersService.getUserBySessionIdAsync(session_id);

    messagerieService.getConversationsForUser(user.id_user,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getMessagesByConversation = (req, res)=>{
    const id_conversation = req.query.id_conversation;
    messagerieService.getMessagesByConversation(id_conversation,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.sendMessage = (req, res)=>{
    const id_conversation = req.body.id_conversation;
    const message = req.body.message;
    const session_id = req.body.session_id;
    messagerieService.sendMessage(id_conversation,message,session_id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createConversation = (req, res)=>{
    const id_user = req.body.id_user;
    const message = req.body.message;
    messagerieService.createConversation(message,id_user,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.toggleResolvedConversation = (req, res)=>{
    const id_conversation = req.body.id_conversation;
    messagerieService.toggleResolvedConversation(id_conversation,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}