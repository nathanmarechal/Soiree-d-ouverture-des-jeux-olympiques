const express = require('express');
var router = express.Router();
const statistiquesController = require('../controllers/statistiques.controller');

router.get('/best-seller-prestation', statistiquesController.getBestSellerPrestation)

module.exports = router;