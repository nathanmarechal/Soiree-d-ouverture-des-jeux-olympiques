const express = require('express');
var router = express.Router();
const prestationController = require('../controllers/prestations.controller');
const prestationMiddleware = require('../middlewares/prestation.middleware');
const rightMiddleware = require('../middlewares/droits.middleware');
const standMiddleware = require('../middlewares/stands.middleware');

/**
 * @swagger
 * /api/prestations/get:
 *   get:
 *     summary: Retrieves all prestations
 *     tags: [Prestation]
 *     responses:
 *       '200':
 *         description: List of all prestations
 *       '500':
 *         description: Internal server error
 */
router.get("/get", prestationController.getPrestations);

/**
 * @swagger
 * /api/prestations/addOwnPrestation:
 *   post:
 *     summary: Creates a new prestation for the current user
 *     tags: [Prestation]
 *     parameters:
 *       - in: query
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
 *               - prix
 *               - image
 *               - id_type_prestation
 *               - id_stand
 *               - is_available
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Label of the prestation
 *               prix:
 *                 type: number
 *                 format: float
 *                 description: Price of the prestation
 *               image:
 *                 type: string
 *                 description: Image URL or path for the prestation
 *                 example: image.png
 *               id_type_prestation:
 *                 type: integer
 *                 description: ID of the type of prestation
 *               id_stand:
 *                 type: integer
 *                 description: ID of the stand associated with the prestation
 *               is_available:
 *                 type: boolean
 *                 description: Availability status of the prestation
 *     responses:
 *       '201':
 *         description: Prestation created successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.post("/addOwnPrestation", rightMiddleware.checkRight, prestationMiddleware.checkIfPrestationBelongsToUserExists, prestationMiddleware.checkTypePrestationExists, standMiddleware.checkStandExists, prestationController.addPrestation);

/**
 * @swagger
 * /api/prestations/updateOwnPrestation/is-available:
 *   patch:
 *     summary: Updates the availability of a prestation for the current user
 *     tags: [Prestation]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_prestation
 *         required: true
 *         description: ID of the prestation to update availability
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Prestation availability updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.patch("/updateOwnPrestation/is-available", rightMiddleware.checkRight, prestationMiddleware.checkIfPrestationBelongsToUserExists, prestationMiddleware.checkPrestationExists, prestationController.updateIsAvailablePrestation);

/**
 * @swagger
 * /api/prestations/updateOwnPrestation:
 *   patch:
 *     summary: Updates a prestation for the current user
 *     tags: [Prestation]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_prestation
 *         required: true
 *         description: ID of the prestation to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Label of the prestation
 *               prix:
 *                 type: number
 *                 format: float
 *                 description: Price of the prestation
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Update date of the prestation
 *               image:
 *                 type: string
 *                 description: Image URL or path for the prestation
 *                 example: image.png
 *               id_type_prestation:
 *                 type: integer
 *                 description: ID of the type of prestation
 *               id_stand:
 *                 type: integer
 *                 description: ID of the stand associated with the prestation
 *               is_available:
 *                 type: boolean
 *                 description: Availability status of the prestation
 *     responses:
 *       '200':
 *         description: Prestation updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.patch("/updateOwnPrestation", rightMiddleware.checkRight, prestationMiddleware.checkIfPrestationBelongsToUserExists, prestationMiddleware.checkPrestationExists, prestationMiddleware.checkTypePrestationExists, standMiddleware.checkStandExists, prestationController.updatePrestation);

/**
 * @swagger
 * /api/prestations/deleteOwnPrestation:
 *   delete:
 *     summary: Deletes a prestation for the current user
 *     tags: [Prestation]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_prestation
 *         required: true
 *         description: ID of the prestation to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Prestation deleted successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Prestation not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/deleteOwnPrestation", rightMiddleware.checkRight, prestationMiddleware.checkIfPrestationBelongsToUserExists, prestationMiddleware.checkPrestationExists, prestationController.deletePrestation);

router.post("/add/picture", prestationController.uploadPicturePresatation);

module.exports = router;