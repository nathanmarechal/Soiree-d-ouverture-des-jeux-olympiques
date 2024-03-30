const rightMiddleware = require("../middlewares/droits.middleware");
const messagerieController = require("../controllers/messagerie.controller");
const express = require("express");
const messagerieMiddleware = require("../middlewares/messagerie.middleware");
const userMiddleware = require("../middlewares/users.middleware");
router = express.Router();

/**
 * @swagger
 * /api/messagerie/get-all-conversations:
 *   get:
 *     summary: Retrieves all conversations
 *     tags: [Messagerie]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID for the user
 *     responses:
 *       '200':
 *         description: All conversations retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Internal server error
 */
router.get("/get-all-conversations", rightMiddleware.checkRight, messagerieController.getConversations);

/**
 * @swagger
 * /api/messagerie/get-conversations-for-user:
 *   get:
 *     summary: Retrieves conversations for a specific user
 *     tags: [Messagerie]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID of the user to fetch conversations for
 *     responses:
 *       '200':
 *         description: Conversations for the user retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Internal server error
 */
router.get("/get-conversations-for-user", rightMiddleware.checkRight, messagerieController.getConversationsForUser);


/**
 * @swagger
 * /api/messagerie/get-messages-by-conversation:
 *   get:
 *     summary: Retrieves messages for a specific conversation
 *     tags: [Messagerie]
 *     parameters:
 *       - in: header
 *         name: id_conversation
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the conversation to fetch messages for
 *       - in: query
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID of the user to verify access to the conversation
 *     responses:
 *       '200':
 *         description: Messages for the conversation retrieved successfully
 *       '404':
 *         description: Conversation not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get-messages-by-conversation", userMiddleware.checkSessionExists, messagerieMiddleware.checkConversationExists, messagerieController.getMessagesByConversation);

/**
 * @swagger
 * /api/messagerie/send-message:
 *   post:
 *     summary: Sends a message in a conversation
 *     tags: [Messagerie]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID of the user sending the message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_conversation
 *               - message
 *             properties:
 *               id_conversation:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/send-message", userMiddleware.checkSessionExists, messagerieMiddleware.checkConversationExists, messagerieController.sendMessage);

/**
 * @swagger
 * /api/messagerie/create-conversation:
 *   post:
 *     summary: Creates a new conversation
 *     tags: [Messagerie]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID of the user initiating the conversation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Conversation created successfully, returns the details of the new conversation
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.post("/create-conversation", userMiddleware.checkSessionExists, messagerieController.createConversation);


/**
 * @swagger
 * /api/messagerie/toggle-resolved-conversation:
 *   patch:
 *     summary: Toggles the resolved status of a conversation
 *     tags: [Messagerie]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_conversation
 *             properties:
 *               id_conversation:
 *                 type: integer
 *                 description: ID of the conversation to toggle the resolved status
 *     responses:
 *       '200':
 *         description: Conversation status toggled successfully
 *       '404':
 *         description: Conversation not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/toggle-resolved-conversation", rightMiddleware.checkRight, messagerieController.toggleResolvedConversation);

module.exports = router