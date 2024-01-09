const express = require('express');
var router = express.Router();
const panierController = require('../controllers/panier.controller');
const userMiddleware = require("../middlewares/users.middleware");


/**
 * @swagger
 * /api/panier/get/{id}:
 *   get:
 *     summary: Retrieves a user's panier by their ID
 *     tags: [Panier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose panier is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Panier retrieved successfully
 *       '404':
 *         description: User or panier not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get/:id", userMiddleware.checkUserExists, panierController.getPanierByUserId);

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

router.patch("/update", panierController.updateQuantityInPanier);

router.post("/add", panierController.addPrestationToPanierUser);

router.delete("/delete", panierController.deletePrestationFromPanierUser);

module.exports = router;