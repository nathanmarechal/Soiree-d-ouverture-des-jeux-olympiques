const express = require('express');
var router = express.Router();
const panierController = require('../controllers/panier.controller');


router.get("/get/:id", panierController.getPanierByUserId);

module.exports = router;