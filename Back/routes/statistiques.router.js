const express = require('express');
var router = express.Router();
const statistiquesController = require('../controllers/statistiques.controller');
const userMiddleware = require('../middlewares/users.middleware');
const standMiddleware = require('../middlewares/stands.middleware');
const rightMiddleware = require('../middlewares/droits.middleware');

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
 *         description: requete invalide
 *       '404':
 *         description: Prestataire non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/nb-prestation-heure',rightMiddleware.checkRight ,statistiquesController.getNbPrestationHeure)

/**
 * @swagger
 * /api/statistiques/prestataire/average-purchase/{id}:
 *   get:
 *     summary: Renvoie la moyenne des achats pour un stand spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Moyenne des achats pour le stand
 *       '400':
 *         description: rerquete invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/average-purchase',rightMiddleware.checkRight,statistiquesController.getAveragePurchaseByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/best-client/{id}:
 *   get:
 *     summary: Renvoie le meilleur client pour un stand spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Meilleur client pour le stand
 *       '400':
 *         description: requete invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/best-client',rightMiddleware.checkRight, statistiquesController.getBestClientByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/sales-revenue-by-type/{id}:
 *   get:
 *     summary: Renvoie les revenus de vente par type pour un stand spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Revenus de vente par type pour le stand
 *       '400':
 *         description: requete invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/sales-revenue-by-type' ,rightMiddleware.checkRight,statistiquesController.getSalesRevnueByTypeByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/average-rating/{id}:
 *   get:
 *     summary: Renvoie la note moyenne pour un stand spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Note moyenne pour le stand
 *       '400':
 *         description: requete invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/average-rating',rightMiddleware.checkRight ,statistiquesController.getAvgRatingByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/count-rating/{id}:
 *   get:
 *     summary: Renvoie le nombre d'évaluations pour un stand spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Nombre d'évaluations pour le stand
 *       '400':
 *         description: requete invalide
 *       '404':
 *         description: Stand non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/count-rating' ,rightMiddleware.checkRight,statistiquesController.getCountRatingByStand)

router.get('/nb-stands',statistiquesController.getNbStands)

router.get('/nb-prestations-available' ,statistiquesController.getNbPrestationsAvailable)

router.get('/nb-users',statistiquesController.getNbUsers)

router.get('/average-purchase' ,statistiquesController.getAveragePurchase)

router.get('/top-seller-stand' ,statistiquesController.getTopSellerStand)

router.get('/top-avis-stand' ,statistiquesController.getTopAvisStand)

module.exports = router;