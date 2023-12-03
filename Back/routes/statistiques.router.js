const express = require('express');
var router = express.Router();
const statistiquesController = require('../controllers/statistiques.controller');

router.get('/best-seller-prestation', statistiquesController.getBestSellerPrestation)

router.get('/new-stand-by-month', statistiquesController.getNewStandByMonth)

module.exports = router;