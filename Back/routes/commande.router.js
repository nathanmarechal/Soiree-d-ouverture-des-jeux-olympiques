const express = require('express');
var router = express.Router();
const commandeController = require('../controllers/commande.controller');
const commandesMiddleware = require('../middlewares/commandes.middleware');
const rightMiddleware = require('../middlewares/droits.middleware');
const prestationsMiddleware = require("../middlewares/prestation.middleware");

/**
 * @swagger
 * /api/commande/getCommandeUserCourant:
 *   get:
 *     summary: Retrieves commandes for the current user based on their session ID
 *     tags: [Commande]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user to fetch commandes for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Commandes retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: User or commande not found
 *       '500':
 *         description: Internal server error
 */
router.get("/getCommandeUserCourant", rightMiddleware.checkRight, commandeController.getCommandeByUserId);

/**
 * @swagger
 * /api/commande/getLigneCommandeBycommandeId:
 *   get:
 *     summary: Retrieves ligne de commande for a specific commande based on commande ID and user's session ID
 *     tags: [Commande]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user to check right
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_commande
 *         required: true
 *         description: Commande ID to fetch ligne de commande for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ligne de commande retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.get("/getLigneCommandeBycommandeId", rightMiddleware.checkRight, commandesMiddleware.checkCommandeExists, commandesMiddleware.checkCommandeBelongsToUserExists, commandeController.getLigneCommandeBycommandeId);

/**
 * @swagger
 * /api/commande/getScheduleCurrentUser:
 *   get:
 *     summary: Retrieves schedule for a specific user by their session ID
 *     tags: [Commande]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user to check right and to fetch schedule for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Schedule retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.get("/getScheduleCurrentUser", rightMiddleware.checkRight, commandeController.getScheduleByUserId);

/**
 * @swagger
 * /api/commande/getCommandesCurrentPrestataires:
 *   get:
 *     summary: Retrieves commandes for the current prestataire based on their session ID
 *     tags: [Commande]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the prestataire to fetch commandes for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Commandes for the prestataire retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.get("/getCommandesCurrentPrestataires", rightMiddleware.checkRight, commandeController.getCommandesPrestataires);

/**
 * @swagger
 * /api/commande/setetatligne:
 *   patch:
 *     summary: Met à jour l'état d'une ligne de commande
 *     tags: [Commande]
 *     parameters:
 *       - in: query
 *         name: id_prestation
 *         required: true
 *         description: ID de la prestation
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id_creneau
 *         required: true
 *         description: ID du créneau
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id_commande
 *         required: true
 *         description: ID de la commande
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: L'état de la ligne de commande a été mis à jour avec succès
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/setetatligne", prestationsMiddleware.checkPrestationExists, prestationsMiddleware.checkCreneauExists, commandesMiddleware.checkCommandeExists, commandesMiddleware.checkLigneCommandeExists, commandeController.setEtatLigneCommandeExterieur);


/**
 * @swagger
 * /api/commande/addCommandeFromPanierUserCourant:
 *   post:
 *     summary: Adds a new commande for the current user based on their session ID
 *     tags: [Commande]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user to add a new commande for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: New commande added successfully, returns the details of the new commande
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Internal server error
 */
router.post("/addCommandeFromPanierUserCourant", rightMiddleware.checkRight, commandeController.addCommande);

module.exports = router;