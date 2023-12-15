const express = require('express');
var router = express.Router();
const emplacementLogistiqueController = require('../controllers/emplacementLogistique.controller');

router.get("/get", emplacementLogistiqueController.getEmplacementLogistique);
router.post("/add", emplacementLogistiqueController.addEmplacementLogistique);
router.delete("/delete/:id", emplacementLogistiqueController.deleteEmplacementLogistique);
router.patch("/update/:id", emplacementLogistiqueController.updateEmplacementLogistique);
module.exports = router;