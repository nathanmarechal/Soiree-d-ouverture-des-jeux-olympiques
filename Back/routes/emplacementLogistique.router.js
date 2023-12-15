const express = require('express');
var router = express.Router();
const emplacementLogistiqueController = require('../controllers/emplacementLogistique.controller');

router.get("/get", emplacementLogistiqueController.getEmplacementLogistique);
router.post("/add", emplacementLogistiqueController.addEmplacementLogistique);

module.exports = router;