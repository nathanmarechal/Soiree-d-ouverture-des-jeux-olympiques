const express = require('express');
var router = express.Router();
const commandeController = require('../controllers/commande.controller');
const usersMiddleware = require('../middlewares/users.middleware');
const commandesMiddleware = require('../middlewares/commandes.middleware');

/**
 * @swagger
 * /api/commande/get/{id}:
 *   get:
 *     summary: Retrieves commandes for a specific user by their ID
 *     tags: [Commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch commandes for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Commandes retrieved successfully
 *       '404':
 *         description: User or commande not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get/:id", usersMiddleware.checkUserExists, commandeController.getCommandeByUserId);

/**
 * @swagger
 * /api/commande/getligne/{id}:
 *   get:
 *     summary: Retrieves ligne de commande for a specific commande by its ID
 *     tags: [Commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Commande ID to fetch ligne de commande for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ligne de commande retrieved successfully
 *       '404':
 *         description: Commande not found
 *       '500':
 *         description: Internal server error
 */
router.get("/getligne/:id", commandesMiddleware.checkCommandeExists, commandeController.getLigneCommandeBycommandeId);

/**
 * @swagger
 * /api/commande/getSchedule/{id}:
 *   get:
 *     summary: Retrieves schedule for a specific user by their ID
 *     tags: [Commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch schedule for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Schedule retrieved successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/getSchedule/:id", usersMiddleware.checkUserExists, commandeController.getScheduleByUserId);

/**
 * @swagger
 * /api/commande/getCommandesPrestataires/{id}:
 *   get:
 *     summary: Retrieves commandes for a specific prestataire by their ID
 *     tags: [Commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Prestataire ID to fetch commandes for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Commandes for the prestataire retrieved successfully
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 */
router.get("/getCommandesPrestataires/:id", usersMiddleware.checkUserExists, commandeController.getCommandesPrestataires);

/**
 * @swagger
 * /api/commande/setetatligne:
 *   patch:
 *     summary: Met à jour l'état d'une ligne de commande
 *     tags: [Commande]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_prestation
 *               - id_creneau
 *               - id_commande
 *             properties:
 *               id_prestation:
 *                 type: integer
 *                 description: ID de la prestation
 *               id_creneau:
 *                 type: integer
 *                 description: ID du créneau
 *               id_commande:
 *                 type: integer
 *                 description: ID de la commande
 *     responses:
 *       '200':
 *         description: L'état de la ligne de commande a été mis à jour avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/setetatligne", commandeController.setEtatLigneCommandeExterieur);

router.post("/add", commandeController.addCommande);

module.exports = router;