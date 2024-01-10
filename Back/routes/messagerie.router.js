const rightMiddleware = require("../middlewares/droits.middleware");
const messagerieController = require("../controllers/messagerie.controller");
const express = require("express");
var router = express.Router();

/**
 * @swagger
 * /api/messagerie/get-all-conversations:
 *   get:
 *     summary: Retrieves all conversations
 *     tags: [Messagerie]
 *     responses:
 *       '200':
 *         description: All conversations retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/get-all-conversations", messagerieController.getConversations);

router.get("/get-conversations-for-user", messagerieController.getConversationsForUser);

router.get("/get-messages-by-conversation", messagerieController.getMessagesByConversation);

router.post("/send-message", messagerieController.sendMessage);

router.post("/create-conversation", messagerieController.createConversation);

router.patch("/toggle-resolved-converstation", messagerieController.toggleResolvedConversation);

module.exports = router