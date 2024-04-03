const express = require('express');
var router = express.Router();
const loginController = require('../controllers/authentication.controller');

/**
 * @swagger
 * /api/login/cookies:
 *   get:
 *     summary: renvoie une session à partir des cookies
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Authentification réussie
 *       '401':
 *         description: Échec de l'authentification
 *       '500':
 *         description: Internal error
 */
router.get("/cookies",loginController.getLoginCookiesToken);

/**
 * @swagger
 * /api/login/logout:
 *   get:
 *     summary: Déconnecte un utilisateur en supprimant sa session des cookies
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: déconnexion réussie
 *       '401':
 *         description: Échec de la déconnexion
 *       '500':
 *         description: Internal error
 */
router.post("/logout",loginController.logout);

/**
 * @swagger
 * /api/login:
 *   get:
 *     summary: Authentifie un utilisateur avec un mot de passe hashé et renvoie une session
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
 *         description: Mot de passe hashé de l'utilisateur
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

/**
 * @swagger
 * /api/login/without-hash:
 *   get:
 *     summary: Authentifie un utilisateur avec un mot de passe en clair et renvoie une session
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
router.get("/without-hash",loginController.getWithoutHash);



module.exports = router;