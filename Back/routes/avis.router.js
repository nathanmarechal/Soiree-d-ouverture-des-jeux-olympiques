const express = require('express');
var router = express.Router();
const avisController = require('../controllers/avis.controller');

router.get("/getAvisByIdStand/:id", avisController.getAvisByIdStand);

router.post("/addAvis", avisController.addAvis);

router.post("/deleteAvisByIdStandUser/:id", avisController.deleteAvis);

module.exports = router;