const express = require('express');
var router = express.Router();
const typeEmplacementLogistiqueController = require('../controllers/typeEmplacementLogistique.controller');

router.get("/get", typeEmplacementLogistiqueController.getTypeEmplacementLogistique);

module.exports = router;