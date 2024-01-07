const express = require('express');
var router = express.Router();
const standsController = require('../controllers/stands.controller');
const standsMiddleware = require('../middlewares/stands.middleware');
const mapMiddleware = require('../middlewares/map.middleware');
const path = require('path');

/**
 * @swagger
 * /api/stands/get:
 *   get:
 *     summary: Renvoie tous les stands
 *     tags: [Stands]
 *     responses:
 *       '200':
 *         description: Une liste de tous les stands
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/get", standsController.getStands);

/**
 * @swagger
 * /api/stands/get-stands-attente:
 *   get:
 *     summary: Renvoie tous les stands en attente
 *     tags: [Stands]
 *     responses:
 *       '200':
 *         description: Une liste de tous les stands en attente
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/get-stands-attente", standsController.getStandsAttente);

/**
 * @swagger
 * /api/stands/get/{id}:
 *   get:
 *     summary: Renvoie un stand par son ID
 *     tags: [Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Détails du stand
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/get/:id", standsMiddleware.checkStandExists ,standsController.getStandById);

/**
 * @swagger
 * /api/stands/description/{id}:
 *   patch:
 *     summary: Met à jour la description d'un stand
 *     tags: [Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description_stand:
 *                 type: string
 *                 description: Nouvelle description du stand
 *     responses:
 *       '200':
 *         description: Description du stand mise à jour
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/description/:id",standsMiddleware.checkStandExists, standsController.updateStandDescription);

/**
 * @swagger
 * /api/stands/update/{id}:
 *   patch:
 *     summary: Met à jour un stand
 *     tags: [Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_stand:
 *                 type: string
 *                 description: Nom du stand
 *               image_stand:
 *                 type: string
 *                 description: Image du stand
 *               description_stand:
 *                 type: string
 *                 description: Description du stand
 *               date_achat:
 *                 type: string
 *                 format: date
 *                 description: Date d'achat du stand
 *               prix:
 *                 type: number
 *                 format: float
 *                 description: Prix du stand
 *               id_emplacement:
 *                 type: integer
 *                 description: ID de l'emplacement du stand
 *     responses:
 *       '200':
 *         description: Stand mis à jour
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/update/:id", standsMiddleware.checkStandExists, mapMiddleware.checkEmplacementExists ,standsController.updateStand);

/**
 * @swagger
 * /api/stands/delete/{id}:
 *   delete:
 *     summary: Supprime un stand
 *     tags: [Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Stand supprimé
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/delete/:id", standsMiddleware.checkStandExists ,standsController.deleteStand);

/**
 * @swagger
 * /api/stands/add:
 *   post:
 *     summary: Crée un nouveau stand
 *     tags: [Stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_stand:
 *                 type: string
 *                 description: Nom du stand
 *               image_stand:
 *                 type: string
 *                 description: Image du stand
 *               description_stand:
 *                 type: string
 *                 description: Description du stand
 *               date_achat:
 *                 type: string
 *                 format: date
 *                 description: Date d'achat du stand
 *               prix:
 *                 type: number
 *                 format: float
 *                 description: Prix du stand
 *               id_emplacement:
 *                 type: integer
 *                 description: ID de l'emplacement du stand
 *     responses:
 *       '201':
 *         description: Stand créé
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà utilisé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/add", mapMiddleware.checkEmplacementExists,standsController.createStand);

router.post("/add/picture", standsController.uploadPictureStand);

router.post("/uploading/picture-description", standsController.uploadingPictureDescription)

router.use('/picture-description', express.static(path.join(__dirname,  '../assets/stand/description')))

router.use('/picture-profile', express.static(path.join(__dirname,  '../assets/stand/profile')))


module.exports = router;