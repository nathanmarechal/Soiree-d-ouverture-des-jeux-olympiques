const express = require('express');
var router = express.Router();
const panierController = require('../controllers/panier.controller');
const userMiddleware = require("../middlewares/users.middleware");
const rightMiddleware = require("../middlewares/droits.middleware");
const prestationsMiddleware = require("../middlewares/prestation.middleware");

/**
 * @swagger
 * /api/panier/getOwnPanier:
 *   get:
 *     summary: Retrieves a user's panier by their session ID
 *     tags: [Panier]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Panier retrieved successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: User or panier not found
 *       '500':
 *         description: Internal server error
 */
router.get("/getOwnPanier", rightMiddleware.checkRight, panierController.getPanierByUserId);

/**
 * @swagger
 * /api/panier/getCreneaux:
 *   get:
 *     summary: Retrieves all creneaux
 *     tags: [Panier]
 *     responses:
 *       '200':
 *         description: List of all creneaux
 *       '500':
 *         description: Internal server error
 */
router.get("/getCreneaux", panierController.getAllCreneaux);

/**
 * @swagger
 * /api/panier/updateOwnPanier:
 *   patch:
 *     summary: Updates the quantity of an item in the user's panier
 *     tags: [Panier]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_prestation
 *               - quantite
 *               - id_creneau
 *             properties:
 *               id_prestation:
 *                 type: integer
 *                 description: ID of the prestation in the panier
 *               quantite:
 *                 type: integer
 *                 description: New quantity of the prestation
 *               id_creneau:
 *                 type: integer
 *                 description: ID of the creneau associated with the prestation
 *     responses:
 *       '200':
 *         description: Quantity updated successfully
 *       '404':
 *         description: User, prestation, or creneau not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/updateOwnPanier", rightMiddleware.checkRight, prestationsMiddleware.checkPrestationExists, prestationsMiddleware.checkCreneauExists, panierController.updateQuantityInPanier);


/**
 * @swagger
 * /api/panier/addPrestationToOwnPanier:
 *   post:
 *     summary: Adds a prestation to the user's panier
 *     tags: [Panier]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_prestation
 *               - quantite
 *               - id_creneau
 *             properties:
 *               id_prestation:
 *                 type: integer
 *                 description: ID of the prestation to add
 *               quantite:
 *                 type: integer
 *                 description: Quantity of the prestation to add
 *               id_creneau:
 *                 type: integer
 *                 description: ID of the creneau associated with the prestation
 *     responses:
 *       '200':
 *         description: Prestation added to the panier successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: User, prestation, or creneau not found
 *       '500':
 *         description: Internal server error
 */
router.post("/addPrestationToOwnPanier", rightMiddleware.checkRight, prestationsMiddleware.checkPrestationExists, prestationsMiddleware.checkCreneauExists, rightMiddleware.checkRight, panierController.addPrestationToPanierUser);

/**
 * @swagger
 * /api/panier/deletePrestationFromPanierOwnUser:
 *   delete:
 *     summary: Deletes a prestation from the user's panier
 *     tags: [Panier]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_prestation
 *         required: true
 *         description: ID of the prestation to delete
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id_creneau
 *         required: true
 *         description: ID of the creneau associated with the prestation
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Prestation deleted from the panier successfully
 *       '404':
 *         description: User, prestation, or creneau not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/deletePrestationFromPanierOwnUser", rightMiddleware.checkRight, prestationsMiddleware.checkPrestationExists, prestationsMiddleware.checkCreneauExists, panierController.deletePrestationFromPanierUser);

module.exports = router;