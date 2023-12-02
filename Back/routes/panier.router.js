const express = require('express');
var router = express.Router();
const panierController = require('../controllers/panier.controller');


router.get("/get/:id", panierController.getPanierByUserId);

router.patch("/update", panierController.updateQuantityInPanier);

router.post("/add", panierController.addPrestationToPanierUser);

router.get("/getCreneaux", panierController.getAllCreneaux);

router.delete("/delete", panierController.deletePrestationFromPanierUser);

module.exports = router;