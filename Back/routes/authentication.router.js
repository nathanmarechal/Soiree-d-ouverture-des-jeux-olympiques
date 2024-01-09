const express = require('express');
var router = express.Router();
const loginController = require('../controllers/authentication.controller');

/**
 * @swagger
 * /api/login:
 *   get:
 *     summary: Authentifie un utilisateur et renvoie une session
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: Adresse email de l'utilisateur
 *         schema:
 *           type: string
 *           format: email
 *       - in: query
 *         name: password
 *         required: true
 *         description: Mot de passe de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Authentification réussie
 *       '401':
 *         description: Échec de l'authentification
 *       '500':
 *         description: Internal error
 */
router.get("/",loginController.getLoginToken);

module.exports = router;