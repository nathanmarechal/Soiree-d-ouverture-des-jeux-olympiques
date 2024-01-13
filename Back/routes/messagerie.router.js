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
 *       - in: query
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
 *       - in: query
 *         name: conversation_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the conversation to fetch messages for
 *     responses:
 *       '200':
 *         description: Messages for the conversation retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/get-messages-by-conversation", messagerieController.getMessagesByConversation);

/**
 * @swagger
 * /api/messagerie/send-message:
 *   post:
 *     summary: Sends a message in a conversation
 *     tags: [Messagerie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversation_id
 *               - session_id
 *               - message
 *             properties:
 *               conversation_id:
 *                 type: integer
 *               session_id:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/send-message", messagerieController.sendMessage);

/**
 * @swagger
 * /api/messagerie/create-conversation:
 *   post:
 *     summary: Creates a new conversation
 *     tags: [Messagerie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - session_id
 *               - participant_ids
 *             properties:
 *               session_id:
 *                 type: string
 *               participant_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       '200':
 *         description: Conversation created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/create-conversation", messagerieController.createConversation);

/**
 * @swagger
 * /api/messagerie/toggle-resolved-conversation:
 *   patch:
 *     summary: Toggles the resolved status of a conversation
 *     tags: [Messagerie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversation_id
 *               - session_id
 *             properties:
 *               conversation_id:
 *                 type: integer
 *               session_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Conversation status toggled successfully
 *       '500':
 *         description: Internal server error
 */
router.patch("/toggle-resolved-conversation", rightMiddleware.checkRight, messagerieController.toggleResolvedConversation);

module.exports = router

