const express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const usersMiddleware = require("../middlewares/users.middleware");
const standsMiddleware = require("../middlewares/stands.middleware");
const rolesMiddleware = require("../middlewares/role.middleware");
const mapMiddleware = require("../middlewares/map.middleware");
const rightMiddleware = require("../middlewares/droits.middleware");

/**
 * @swagger
 * /api/users/get:
 *   get:
 *     summary: Renvoie tous les utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la session
 *     responses:
 *       '200':
 *         description: Liste de tous les utilisateurs
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Erreur interne
 */
router.get("/get", rightMiddleware.checkRight, usersController.getUsers);


/**
 * @swagger
 * /api/users/getBySessionId:
 *   get:
 *     summary: Renvoie l'utilisateur correspondant à un ID de session donné
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: ID de session de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Session trouvé
 *       '404':
 *         description: Session non trouvé
 *       '500':
 *         description: Internal error
 */
router.get("/getBySessionId",usersMiddleware.checkSessionExists, usersController.getUserBySessionId);


/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     summary: Met à jour les informations d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Identifiant de la session
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_user
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               nom:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               code_postal:
 *                 type: integer
 *                 description: Code postal de l'utilisateur
 *               adresse:
 *                 type: string
 *                 description: Adresse de l'utilisateur
 *               commune:
 *                 type: string
 *                 description: Commune de l'utilisateur
 *               solde:
 *                 type: number
 *                 format: float
 *                 description: Solde de l'utilisateur
 *               id_stand:
 *                 type: integer
 *                 format: int32
 *                 description: ID du stand associé à l'utilisateur, si applicable
 *               id_role:
 *                 type: integer
 *                 format: int32
 *                 description: ID du rôle de l'utilisateur
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour avec succès
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà utilisé
 *       '500':
 *         description: Internal error
 */

router.patch("/update", rightMiddleware.checkRight, usersMiddleware.checkUserExists, usersMiddleware.validateUserInput, usersMiddleware.checkEmailExists, standsMiddleware.checkStandAppartenance, rolesMiddleware.checkRoleExists, usersController.updateUser);

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: ID de session pour l'authentification
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_user
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal error
 */
router.delete("/delete", rightMiddleware.checkRight, usersMiddleware.checkUserExists, usersController.deleteUser);


/**
 * @swagger
 * /api/users/updateSolde:
 *   patch:
 *     summary: Met à jour le solde de l'utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Identifiant de la session
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               solde:
 *                 type: number
 *                 description: Nouveau solde à affecter
 *     responses:
 *       '200':
 *         description: Solde mis à jour
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne
 */
router.patch("/updateSolde", rightMiddleware.checkRight, usersController.updateSolde);


/**
 * @swagger
 * /api/users/updateUserCourantWoPassword:
 *   patch:
 *     summary: Met à jour les informations de l'utilisateur courant sans changer le mot de passe
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: ID de session pour l'authentification
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               nom:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur
 *               adresse:
 *                 type: string
 *                 description: Adresse de l'utilisateur
 *               code_postal:
 *                 type: integer
 *                 description: Code postal de l'utilisateur
 *               commune:
 *                 type: string
 *                 description: Commune de l'utilisateur
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà utilisé
 *       '500':
 *         description: Internal error
 */
router.patch("/updateUserCourantWoPassword", rightMiddleware.checkRight, usersMiddleware.checkEmailUserCourantExists, usersController.updateUserCourantWoPassword);


/**
 * @swagger
 * /api/users/registerClient:
 *   post:
 *     summary: Enregistre un nouveau client
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Prénom du client
 *               lastName:
 *                 type: string
 *                 description: Nom du client
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email du client
 *               password:
 *                 type: string
 *                 description: Mot de passe du client
 *               adresse:
 *                 type: string
 *                 description: Adresse du client
 *               code_postal:
 *                 type: integer
 *                 description: Code postal du client
 *               commune:
 *                 type: string
 *                 description: Commune du client
 *               id_role:
 *                 type: integer
 *                 description: ID du rôle du client (sera toujours 3 pour les clients)
 *                 default: 3
 *     responses:
 *       '201':
 *         description: Client créé
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà utilisé
 *       '500':
 *         description: Internal error
 */
router.post("/registerClient", usersMiddleware.validateUserInput, usersMiddleware.checkEmailExists,rolesMiddleware.checkIfClient, usersController.createUser);

/**
 * @swagger
 * /api/users/registerPrestataire:
 *   post:
 *     summary: Enregistre un nouveau prestataire avec un stand
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     description: Prénom du prestataire
 *                   lastName:
 *                     type: string
 *                     description: Nom du prestataire
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Email du prestataire
 *                   password:
 *                     type: string
 *                     description: Mot de passe du prestataire
 *                   adresse:
 *                     type: string
 *                     description: Adresse du prestataire
 *                   code_postal:
 *                     type: integer
 *                     description: Code postal du prestataire
 *                   commune:
 *                     type: string
 *                     description: Commune du prestataire
 *                   id_role:
 *                     type: integer
 *                     description: ID du rôle du prestataire*
 *                     default: 2
 *               stand:
 *                 type: object
 *                 properties:
 *                   nom_stand:
 *                     type: string
 *                     description: Nom du stand
 *                   image_stand:
 *                     type: string
 *                     description: Image du stand
 *                   description_stand:
 *                     type: string
 *                     description: Description du stand
 *                   id_emplacement:
 *                     type: integer
 *                     description: ID de l'emplacement du stand
 *     responses:
 *       '201':
 *         description: Prestataire créé
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà utilisé
 *       '500':
 *         description: Internal error
 */
router.post("/registerPrestataire", usersMiddleware.validateUserInput, usersMiddleware.checkEmailExists, rolesMiddleware.checkIfPrestataire, mapMiddleware.checkEmplacementExists, usersController.createUserWithStand);


/**
 * @swagger
 * /api/users/create-user:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: L'ID de session de l'utilisateur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastName
 *               - firstName
 *               - email
 *               - password
 *               - adresse
 *               - code_postal
 *               - commune
 *               - id_role
 *             properties:
 *               lastName:
 *                 type: string
 *                 description: Le nom de famille de l'utilisateur
 *               firstName:
 *                 type: string
 *                 description: Le prénom de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'email de l'utilisateur
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Le mot de passe de l'utilisateur
 *               adresse:
 *                 type: string
 *                 description: L'adresse de l'utilisateur
 *               code_postal:
 *                 type: integer
 *                 description: Le code postal de l'adresse de l'utilisateur
 *               commune:
 *                 type: string
 *                 description: La commune de l'utilisateur
 *               id_role:
 *                 type: integer
 *                 description: L'ID de rôle attribué à l'utilisateur
 *     responses:
 *       '201':
 *         description: Utilisateur créé avec succès
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà utilisé
 *       '500':
 *         description: Erreur interne
 */
router.post("/create-user", rightMiddleware.checkRight, usersMiddleware.checkEmailExists, usersMiddleware.validateUserInput, rolesMiddleware.checkRoleExists, usersController.createUser);

/**
 * @swagger
 * /api/users/getUserAttente:
 *   get:
 *     summary: Renvoie les utilisateurs en attente d'approbation
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: ID de session pour l'authentification
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs en attente
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Internal error
 */
router.get("/getUserAttente", rightMiddleware.checkRight, usersController.getUsersAttente);


/**
 /**
 * @swagger
 * /api/users/acceptUser:
 *   post:
 *     summary: Accepte un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: ID de session pour l'authentification
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_user
 *         required: true
 *         description: ID de l'utilisateur à accepter
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Utilisateur accepté
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal error
 */
router.post("/acceptUser", rightMiddleware.checkRight, usersMiddleware.checkUserAttenteExists, usersController.acceptUser);


/**
 * @swagger
 * /api/users/refuseUser:
 *   post:
 *     summary: Refuse un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: ID de session pour l'authentification
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_user
 *         required: true
 *         description: ID de l'utilisateur à refuser
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Utilisateur refusé
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal error
 */
router.post("/refuseUser", rightMiddleware.checkRight, usersMiddleware.checkUserAttenteExists, usersController.refuseUser);


module.exports = router;