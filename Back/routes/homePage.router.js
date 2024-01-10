const express = require('express');
var router = express.Router();
const path = require('path');
const homePageController = require("../controllers/homePage.controller");
const textAccueilMiddleware = require("../middlewares/text-accueil.middleware");
const rightsMiddleware = require("../middlewares/droits.middleware");

/**
 * @swagger
 * /api/homePage/getAllDescription:
 *   get:
 *     summary: Retrieves all descriptions
 *     tags: [HomePage]
 *     responses:
 *       '200':
 *         description: Descriptions retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/getAllDescription", homePageController.getAllDescription);

/**
 * @swagger
 * /api/homePage/description:
 *   patch:
 *     summary: Updates the description on the home page
 *     tags: [HomePage]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_text_accueil
 *         required: true
 *         description: ID of the home page text to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: New description text for the home page
 *                 example: <p>Texte d'accueil test</p>
 *     responses:
 *       '200':
 *         description: Home page description updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.patch("/description", rightsMiddleware.checkRight, textAccueilMiddleware.checkTextAccueilExists, homePageController.updateHomePageDescription);

router.post("/uploading/picture-description", homePageController.uploadingPictureHomePageDescription)

router.use('/picture-description', express.static(path.join(__dirname,  '../assets/homePage/description')))

module.exports = router;