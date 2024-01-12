const rightMiddleware = require("../middlewares/droits.middleware");
const messagerieController = require("../controllers/messagerie.controller");
const express = require("express");
router = express.Router();

/**
 * @swagger
 * /api/messagerie/get-all-conversations:
 *   get:
 *     summary: Retrieves all conversations
 *     tags: [Messagerie]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID for the user
 *     responses:
 *       '200':
 *         description: All conversations retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/get-all-conversations", rightMiddleware.checkRight, messagerieController.getConversations);

router.get("/get-conversations-for-user",rightMiddleware.checkRight, messagerieController.getConversationsForUser);

router.get("/get-messages-by-conversation", messagerieController.getMessagesByConversation);

router.post("/send-message", messagerieController.sendMessage);

router.post("/create-conversation", messagerieController.createConversation);

router.patch("/toggle-resolved-converstation",rightMiddleware.checkRight, messagerieController.toggleResolvedConversation);

module.exports = router

