const express = require('express');
var router = express.Router();
const mapController = require('../controllers/map.controller');
const mapMiddleware = require('../middlewares/map.middleware');
const rightMiddleware = require('../middlewares/droits.middleware')

/**
 * @swagger
 * /api/map/get-all-type-zones:
 *   get:
 *     summary: Retrieves all type zones
 *     tags: [Map]
 *     responses:
 *       '200':
 *         description: List of type zones
 *       '500':
 *         description: Internal server error
 */
router.get("/get-all-type-zones", mapController.getTypeZones);

/**
 * @swagger
 * /api/map/get-all-areas:
 *   get:
 *     summary: Retrieves all areas
 *     tags: [Map]
 *     responses:
 *       '200':
 *         description: List of areas
 *       '500':
 *         description: Internal server error
 */
router.get("/get-all-areas", mapController.getAreas);

/**
 * @swagger
 * /api/map/update-area:
 *   patch:
 *     summary: Updates an area
 *     tags: [Map]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_emplacement
 *         required: true
 *         description: ID of the area to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_zone:
 *                 type: integer
 *                 description: ID of the zone associated with the area
 *     responses:
 *       '200':
 *         description: Area updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.patch("/update-area", rightMiddleware.checkRight, mapMiddleware.checkEmplacementExists, mapMiddleware.checkZoneExists, mapController.updateArea);


/**
 * @swagger
 * /api/map/delete-area:
 *   delete:
 *     summary: Deletes an area
 *     tags: [Map]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_emplacement
 *         required: true
 *         description: ID of the area to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Area deleted successfully
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete-area", rightMiddleware.checkRight, mapMiddleware.checkEmplacementExists, mapController.deleteArea);

/**
 * @swagger
 * /api/map/create-area:
 *   post:
 *     summary: Creates a new area
 *     tags: [Map]
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
 *               - coordonnes
 *               - surface
 *               - id_zone
 *             properties:
 *               coordonnes:
 *                 type: object
 *                 description: Coordinates of the area (format and structure as per your application's requirements)
 *               surface:
 *                 type: number
 *                 format: float
 *                 description: Surface area
 *               id_zone:
 *                 type: integer
 *                 description: ID of the zone associated with the area
 *     responses:
 *       '201':
 *         description: Area created successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.post("/create-area", rightMiddleware.checkRight, mapMiddleware.checkZoneExists, mapController.createArea);


/**
 * @swagger
 * /api/map/get-all-zones:
 *   get:
 *     summary: Retrieves all zones
 *     tags: [Map]
 *     responses:
 *       '200':
 *         description: List of zones
 *       '500':
 *         description: Internal server error
 */
router.get("/get-all-zones", mapController.getZones);

/**
 * @swagger
 * /api/map/get-zone:
 *   get:
 *     summary: Retrieves a zone by ID
 *     tags: [Map]
 *     parameters:
 *       - in: query
 *         name: id_zone
 *         required: true
 *         description: ID of the zone to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Zone details
 *       '404':
 *         description: Zone not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get-zone", mapMiddleware.checkZoneExists, mapController.getZoneById);

/**
 * @swagger
 * /api/map/update-zone:
 *   patch:
 *     summary: Updates a zone
 *     tags: [Map]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_zone
 *         required: true
 *         description: ID of the zone to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_type_zone:
 *                 type: integer
 *                 description: ID of the type of the zone
 *               libelle:
 *                 type: string
 *                 description: Label of the zone
 *               couleur_hexa:
 *                 type: string
 *                 description: Hexadecimal color of the zone
 *     responses:
 *       '200':
 *         description: Zone updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.patch("/update-zone", rightMiddleware.checkRight, mapMiddleware.checkZoneExists, mapMiddleware.checkTypeZoneExists, mapController.updateZone);

/**
 * @swagger
 * /api/map/delete-zone:
 *   delete:
 *     summary: Deletes a zone
 *     tags: [Map]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_zone
 *         required: true
 *         description: ID of the zone to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Zone deleted successfully
 *       '404':
 *         description: Zone not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete-zone", rightMiddleware.checkRight, mapMiddleware.checkZoneExists, mapController.deleteZone);

/**
 * @swagger
 * /api/map/create-zone:
 *   post:
 *     summary: Creates a new zone
 *     tags: [Map]
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
 *               - id_type_zone
 *               - libelle
 *               - couleur_hexa
 *             properties:
 *               id_type_zone:
 *                 type: integer
 *                 description: ID of the type of the zone. This field specifies the category or classification of the zone.
 *               libelle:
 *                 type: string
 *                 description: The label or name of the zone.
 *               couleur_hexa:
 *                 type: string
 *                 description: Hexadecimal color code representing the zone's color.
 *     responses:
 *       '201':
 *         description: Zone created successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.post("/create-zone", rightMiddleware.checkRight, mapMiddleware.checkTypeZoneExists, mapController.createZone);


module.exports = router;