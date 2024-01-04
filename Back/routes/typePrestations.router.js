const express = require('express');
var router = express.Router();
const typePrestationController = require('../controllers/typePrestations.controller');

/**
 * @swagger
 * /api/typePrestations/get:
 *   get:
 *     summary: Renvoie tous les types de prestations
 *     tags: [Type de prestations]
 *     responses:
 *       '200':
 *         description: Tous les types de prestations
 *       '500':
 *         description: Internal error
 */
router.get("/get", typePrestationController.getTypePrestations);

module.exports = router;