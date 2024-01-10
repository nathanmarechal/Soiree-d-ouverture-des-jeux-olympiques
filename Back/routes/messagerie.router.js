const rightMiddleware = require("../middlewares/droits.middleware");
const messagerieController = require("../controllers/messagerie.controller");
const express = require("express");
var router = express.Router();

router.get("/get-all-conversations", messagerieController.getConversations);

router.get("/get-conversations-for-user", messagerieController.getConversationsForUser);

router.get("/get-messages-by-conversation", messagerieController.getMessagesByConversation);

router.post("/send-message", messagerieController.sendMessage);

module.exports = router