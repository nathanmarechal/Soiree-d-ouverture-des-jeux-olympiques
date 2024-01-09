const express = require('express');
var router = express.Router();
const statistiquesController = require('../controllers/statistiques.controller');
const userMiddleware = require('../middlewares/users.middleware');

/**
 * @swagger
 * /api/statistiques/best-seller-prestation:
 *   get:
 *     summary: Renvoie la prestation la plus vendue
 *     tags: [Statistiques]
 *     responses:
 *       '200':
 *         description: Détails de la prestation la plus vendue
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/best-seller-prestation', statistiquesController.getBestSellerPrestation)

/**
 * @swagger
 * /api/statistiques/new-stand-by-month:
 *   get:
 *     summary: Renvoie le nombre de nouveaux stands créés par mois
 *     tags: [Statistiques]
 *     responses:
 *       '200':
 *         description: Nombre de nouveaux stands par mois
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/new-stand-by-month', statistiquesController.getNewStandByMonth)

/**
 * @swagger
 * /api/statistiques/prestataire/nb-prestation-heure/{id}:
 *   get:
 *     summary: Renvoie le nombre de prestations par heure pour un prestataire spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du prestataire
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Nombre de prestations par heure pour le prestataire
 *       '400':
 *         description: ID invalide
 *       '404':
 *         description: Prestataire non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/nb-prestation-heure/:id',userMiddleware.checkPrestataireExists ,statistiquesController.getNbPrestationHeure)

router.get('/prestataire/average-purchase/:id',userMiddleware.checkPrestataireExists ,statistiquesController.getAveragePurchaseByStand)

router.get('/prestataire/best-client/:id',userMiddleware.checkPrestataireExists ,statistiquesController.getBestClientByStand)

router.get('/prestataire/sales-revenue-by-type/:id',userMiddleware.checkPrestataireExists ,statistiquesController.getSalesRevnueByTypeByStand)

router.get('/prestataire/average-rating/:id',userMiddleware.checkPrestataireExists ,statistiquesController.getAvgRatingByStand)

router.get('/prestataire/count-rating/:id',userMiddleware.checkPrestataireExists ,statistiquesController.getCountRatingByStand)

module.exports = router;