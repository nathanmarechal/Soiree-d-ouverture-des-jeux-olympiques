const express = require('express');
var router = express.Router();
const commandeController = require('../controllers/commande.controller');


router.get("/get/:id", commandeController.getCommandeByUserId);

module.exports = router;