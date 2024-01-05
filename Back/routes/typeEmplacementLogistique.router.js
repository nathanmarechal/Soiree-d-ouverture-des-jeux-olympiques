const express = require('express');
var router = express.Router();
const typeEmplacementLogistiqueController = require('../controllers/typeEmplacementLogistique.controller');

/**
 * @swagger
 * /api/type-emplacement-logistique/get:
 *   get:
 *     summary: Renvoie tous les types d'emplacements logistiques
 *     tags: [TypeEmplacementLogistique]
 *     responses:
 *       '200':
 *         description: Une liste de tous les types d'emplacements logistiques
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/get", typeEmplacementLogistiqueController.getTypeEmplacementLogistique);

module.exports = router;