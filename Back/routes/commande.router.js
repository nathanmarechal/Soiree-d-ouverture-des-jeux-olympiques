const express = require('express');
var router = express.Router();
const commandeController = require('../controllers/commande.controller');


router.get("/get/:id", commandeController.getCommandeByUserId);
router.post("/add", commandeController.addCommande);

module.exports = router;