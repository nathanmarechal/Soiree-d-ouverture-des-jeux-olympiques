const express = require('express');
var router = express.Router();
const emplacementLogistiqueController = require('../controllers/emplacementLogistique.controller');
const rightMiddleware = require("../middlewares/droits.middleware");
const emplacementLogistiqueMiddleware = require("../middlewares/logistique.middleware");

/**
 * @swagger
 * /api/emplacement-logistique/get:
 *   get:
 *     summary: Retrieves all emplacements logistiques
 *     tags: [EmplacementLogistique]
 *     responses:
 *       '200':
 *         description: List of all emplacements logistiques
 *       '500':
 *         description: Internal server error
 */
router.get("/get", emplacementLogistiqueController.getEmplacementLogistique);

/**
 * @swagger
 * /api/emplacement-logistique/add:
 *   post:
 *     summary: Adds a new emplacement logistique
 *     tags: [EmplacementLogistique]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *               - coordonnes
 *               - id_type_emplacement_logistique
 *               - unite
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Label of the emplacement logistique
 *               coordonnes:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Latitude and Longitude coordinates of the emplacement logistique
 *                 example: [48.857572, 2.2977709]
 *               id_type_emplacement_logistique:
 *                 type: integer
 *                 description: ID of the type of emplacement logistique
 *               unite:
 *                 type: number
 *                 description: Unit or quantity of the emplacement logistique
 *     responses:
 *       '201':
 *         description: Emplacement logistique added successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */

router.post("/add", rightMiddleware.checkRight, emplacementLogistiqueMiddleware.checkTypeEmplacementLogistiqueExists, emplacementLogistiqueController.addEmplacementLogistique);

/**
 * @swagger
 * /api/emplacement-logistique/delete:
 *   delete:
 *     summary: Deletes an emplacement logistique
 *     tags: [EmplacementLogistique]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_emplacement_logistique
 *         required: true
 *         description: ID of the emplacement logistique to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Emplacement logistique deleted successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete", rightMiddleware.checkRight, emplacementLogistiqueMiddleware.checkEmplacementLogistiqueExists, emplacementLogistiqueController.deleteEmplacementLogistique);

/**
 * @swagger
 * /api/emplacement-logistique/update:
 *   patch:
 *     summary: Updates an emplacement logistique
 *     tags: [EmplacementLogistique]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_emplacement_logistique
 *         required: true
 *         description: ID of the emplacement logistique to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *               - coordonnes
 *               - id_type_emplacement_logistique
 *               - unite
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Label of the emplacement logistique
 *               id_type_emplacement_logistique:
 *                 type: integer
 *                 description: ID of the type of emplacement logistique
 *               unite:
 *                 type: number
 *                 description: Unit or quantity of the emplacement logistique
 *     responses:
 *       '200':
 *         description: Emplacement logistique updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Emplacement logistique not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/update", rightMiddleware.checkRight, emplacementLogistiqueMiddleware.checkEmplacementLogistiqueExists, emplacementLogistiqueMiddleware.checkTypeEmplacementLogistiqueExists, emplacementLogistiqueController.updateEmplacementLogistique);

module.exports = router;