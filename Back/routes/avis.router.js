const express = require('express');
var router = express.Router();
const avisController = require('../controllers/avis.controller');
const rightMiddleware = require('../middlewares/droits.middleware');
const standMiddleware = require('../middlewares/stands.middleware');
const userMiddleware = require('../middlewares/users.middleware');
const avisMiddleware = require('../middlewares/avis.middleware');
const path = require("path");

/**
 * @swagger
 * /api/avis/getAvisByIdStand:
 *   get:
 *     summary: Retrieves avis for a specific stand by its ID
 *     tags: [Avis]
 *     parameters:
 *       - in: query
 *         name: id_stand
 *         required: true
 *         description: Stand ID to fetch avis for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Avis retrieved successfully
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.get("/getAvisByIdStand", standMiddleware.checkStandExists, avisController.getAvisByIdStand);

/**
 * @swagger
 * /api/avis/add:
 *   post:
 *     summary: Adds a new avis
 *     tags: [Avis]
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
 *             properties:
 *               id_stand:
 *                 type: integer
 *                 description: ID of the stand
 *               id_user:
 *                 type: integer
 *                 description: ID of the user
 *               note:
 *                 type: integer
 *                 description: Rating note
 *               commentaire:
 *                 type: string
 *                 description: Commentaire for the avis
 *     responses:
 *       '201':
 *         description: Avis added successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.post("/add", rightMiddleware.checkRight, standMiddleware.checkStandExists, userMiddleware.checkUserExists,avisController.addAvis);

/**
 * @swagger
 * /api/avis/deleteAvisByIdStandUser:
 *   delete:
 *     summary: Deletes an avis
 *     tags: [Avis]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_avis
 *         required: true
 *         description: ID of the avis to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Avis deleted successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Avis not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/deleteAvisByIdStandUser", rightMiddleware.checkRight, avisMiddleware.checkAvisExists, avisController.deleteAvis);

router.post("/uploading/picture-avis", avisController.uploadingPictureAvis)

router.use('/picture-avis', express.static(path.join(__dirname,  '../assets/stand/Avis')))

module.exports = router;