const express = require('express');
var router = express.Router();
const statistiquesController = require('../controllers/statistiques.controller');
const rightMiddleware = require('../middlewares/droits.middleware');
const statistiquesMiddleware = require('../middlewares/stats.middleware');

/**
 * @swagger
 * /api/statistiques/best-seller-prestation:
 *   get:
 *     summary: Renvoie la prestation la plus vendue
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Détails de la prestation la plus vendue
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/best-seller-prestation',rightMiddleware.checkRight, statistiquesController.getBestSellerPrestation)

/**
 * @swagger
 * /api/statistiques/new-stand-by-month:
 *   get:
 *     summary: Renvoie le nombre de nouveaux stands créés par mois
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID de l'utilisateur pour l'accès aux statistiques
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nombre de nouveaux stands par mois
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/new-stand-by-month',rightMiddleware.checkRight, statistiquesController.getNewStandByMonth)

/**
 * @swagger
 * /api/statistiques/prestataire/nb-prestation-heure:
 *   get:
 *     summary: Renvoie le nombre de prestations par heure pour un prestataire spécifique
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID du prestataire
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nombre de prestations par heure pour le prestataire
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/nb-prestation-heure',rightMiddleware.checkRight, statistiquesMiddleware.checkIfUserWithStandThatExists,statistiquesController.getNbPrestationHeure)

/**
 * @swagger
 * /api/statistiques/prestataire/average-purchase:
 *   get:
 *     summary: Renvoie la moyenne des achats pour un stand spécifique basé sur la session
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID du stand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Moyenne des achats pour le stand
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/average-purchase',rightMiddleware.checkRight, statistiquesMiddleware.checkIfUserWithStandThatExists,statistiquesController.getAveragePurchaseByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/best-client:
 *   get:
 *     summary: Renvoie le meilleur client pour un stand spécifique basé sur la session
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID du stand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Meilleur client pour le stand
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/best-client',rightMiddleware.checkRight, statistiquesMiddleware.checkIfUserWithStandThatExists, statistiquesController.getBestClientByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/sales-revenue-by-type:
 *   get:
 *     summary: Renvoie les revenus de vente par type pour un stand spécifique basé sur la session
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID du stand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Revenus de vente par type pour le stand
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/sales-revenue-by-type' ,rightMiddleware.checkRight, statistiquesMiddleware.checkIfUserWithStandThatExists,statistiquesController.getSalesRevnueByTypeByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/average-rating:
 *   get:
 *     summary: Renvoie la note moyenne pour un stand spécifique basé sur la session
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID du stand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note moyenne pour le stand
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/average-rating',rightMiddleware.checkRight, statistiquesMiddleware.checkIfUserWithStandThatExists ,statistiquesController.getAvgRatingByStand)

/**
 * @swagger
 * /api/statistiques/prestataire/count-rating:
 *   get:
 *     summary: Renvoie le nombre d'évaluations pour un stand spécifique basé sur la session
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID du stand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nombre d'évaluations pour le stand
 *       '400':
 *         description: Requête invalide
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/prestataire/count-rating' ,rightMiddleware.checkRight, statistiquesMiddleware.checkIfUserWithStandThatExists,statistiquesController.getCountRatingByStand)

/**
 * @swagger
 * /api/statistiques/nb-stands:
 *   get:
 *     summary: Renvoie le nombre total de stands
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID de l'utilisateur pour l'autorisation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nombre total de stands
 *       '403':
 *         description: Accès refusé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/nb-stands', rightMiddleware.checkRight, statistiquesController.getNbStands);

/**
 * @swagger
 * /api/statistiques/nb-prestations-available:
 *   get:
 *     summary: Renvoie le nombre total de prestations disponibles
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID pour l'autorisation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nombre total de prestations disponibles
 *       '403':
 *         description: Accès refusé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/nb-prestations-available',rightMiddleware.checkRight ,statistiquesController.getNbPrestationsAvailable)

/**
 * @swagger
 * /api/statistiques/nb-users:
 *   get:
 *     summary: Renvoie le nombre total d'utilisateurs
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID pour l'autorisation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nombre total d'utilisateurs
 *       '403':
 *         description: Accès refusé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/nb-users',rightMiddleware.checkRight,statistiquesController.getNbUsers)

/**
 * @swagger
 * /api/statistiques/average-purchase:
 *   get:
 *     summary: Renvoie la moyenne des achats
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID pour l'autorisation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Moyenne des achats
 *       '403':
 *         description: Accès refusé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/average-purchase',rightMiddleware.checkRight ,statistiquesController.getAveragePurchase)

/**
 * @swagger
 * /api/statistiques/top-seller-stand:
 *   get:
 *     summary: Renvoie le stand ayant le plus de ventes
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID pour l'autorisation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stand ayant le plus de ventes
 *       '403':
 *         description: Accès refusé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/top-seller-stand',rightMiddleware.checkRight ,statistiquesController.getTopSellerStand)

/**
 * @swagger
 * /api/statistiques/top-avis-stand:
 *   get:
 *     summary: Renvoie le stand avec les meilleurs avis
 *     tags: [Statistiques]
 *     parameters:
 *       - in: header
 *         name: session_id
 *         required: true
 *         description: Session ID pour l'autorisation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stand avec les meilleurs avis
 *       '403':
 *         description: Accès refus
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/top-avis-stand',rightMiddleware.checkRight ,statistiquesController.getTopAvisStand)

module.exports = router;