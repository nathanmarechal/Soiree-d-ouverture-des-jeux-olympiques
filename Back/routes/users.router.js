const express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const {checkRight} = require("../middlewares/authentication.middleware");
const loginMiddleware = require("../middlewares/authentication.middleware");

/*
router.get("/get", usersController.getUsers);

router.get("/getBySessionId",usersController.getUserBySessionId)

router.patch("/update/:id", usersController.updateUser);

router.post("/", (req, res, next) => {
    checkRight(req, res, next, "create_users");
}, usersController.createUser);

router.delete("/delete/:id", usersController.deleteUser);

router.patch("/updateSolde", usersController.updateSolde);

router.patch("/updateUserCourantWoPassword", usersController.updateUserCourantWoPassword);

router.post("/registerClient", loginMiddleware.checkRight, usersController.createUser);

router.post("/registerPrestataire", usersController.createUserWithStand);

router.get("/getUserAttente", usersController.getUsersAttente);

router.post("/acceptUser/:id", usersController.acceptUser);

router.post("/refuseUser/:id", usersController.refuseUser);
 */

/**
 * @swagger
 * /api/users/get:
 *   get:
 *     summary: Renvoie tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Liste de tous les utilisateurs
 *       '500':
 *         description: Erreur interne
 */
router.get("/get", usersController.getUsers);

/**
 * @swagger
 * /api/users/getBySessionId:
 *   get:
 *     summary: Renvoie l'utilisateur correspondant à un ID de session donné
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: ID de session de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur trouvé
 *       '404':
 *         description: Utilisateur non trouvé
 *       '400':
 *         description: Paramètre manquant ou invalide
 */
router.get("/getBySessionId", usersController.getUserBySessionId);


/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     summary: Met à jour les informations d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               id_etat:
 *                 type: integer
 *                 format: int32
 *                 description: ID de l'état de l'utilisateur, si applicable
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour avec succès
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Utilisateur non trouvé
 */
router.patch("/update/:id", usersController.updateUser);

// ... Vous répétez ce processus pour chaque route ...

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       '201':
 *         description: Utilisateur créé
 *       '400':
 *         description: Requête invalide
 */
router.post("/", (req, res, next) => {
    checkRight(req, res, next, "create_users");
}, usersController.createUser);



/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé
 *       '404':
 *         description: Utilisateur non trouvé
 */
router.delete("/delete/:id", usersController.deleteUser);

/**
 * @swagger
 * /api/users/updateSolde:
 *   patch:
 *     summary: Met à jour le solde de l'utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *               solde:
 *                 type: number
 *                 description: Nouveau solde à affecter
 *     responses:
 *       '200':
 *         description: Solde mis à jour
 *       '400':
 *         description: Requête invalide
 */
router.patch("/updateSolde", usersController.updateSolde);

/**
 * @swagger
 * /api/users/updateUserCourantWoPassword:
 *   patch:
 *     summary: Met à jour les informations de l'utilisateur courant sans changer le mot de passe
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour
 *       '400':
 *         description: Requête invalide
 */
router.patch("/updateUserCourantWoPassword", usersController.updateUserCourantWoPassword);

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
 *               name:
 *                 type: string
 *                 description: Nom du client
 *               email:
 *                 type: string
 *                 description: Email du client
 *               password:
 *                 type: string
 *                 description: Mot de passe du client
 *     responses:
 *       '201':
 *         description: Client créé
 *       '400':
 *         description: Requête invalide
 */
router.post("/registerClient", loginMiddleware.checkRight, usersController.createUser);

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
 *               name:
 *                 type: string
 *                 description: Nom du prestataire
 *               email:
 *                 type: string
 *                 description: Email du prestataire
 *               password:
 *                 type: string
 *                 description: Mot de passe du prestataire
 *               standId:
 *                 type: string
 *                 description: ID du stand associé
 *     responses:
 *       '201':
 *         description: Prestataire créé
 *       '400':
 *         description: Requête invalide
 */
router.post("/registerPrestataire", usersController.createUserWithStand);

/**
 * @swagger
 * /api/users/getUserAttente:
 *   get:
 *     summary: Renvoie les utilisateurs en attente d'approbation
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs en attente
 *       '500':
 *         description: Erreur interne
 */
router.get("/getUserAttente", usersController.getUsersAttente);

/**
 * @swagger
 * /api/users/acceptUser/{id}:
 *   post:
 *     summary: Accepte un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à accepter
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur accepté
 *       '404':
 *         description: Utilisateur non trouvé
 */
router.post("/acceptUser/:id", usersController.acceptUser);

/**
 * @swagger
 * /api/users/refuseUser/{id}:
 *   post:
 *     summary: Refuse un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à refuser
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur refusé
 *       '404':
 *         description: Utilisateur non trouvé
 */
router.post("/refuseUser/:id", usersController.refuseUser);

module.exports = router;