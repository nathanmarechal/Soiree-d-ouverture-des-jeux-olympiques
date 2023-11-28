const express = require('express');
var router = express.Router();
const panierController = require('../controllers/panier.controller');


router.get("/get/:id", panierController.getPanierByUserId);

router.delete("/delete", panierController.deletePrestationFromPanierUser);

module.exports = router;