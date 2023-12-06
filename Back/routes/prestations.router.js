const express = require('express');
var router = express.Router();
const prestationController = require('../controllers/prestations.controller');

router.get("/get", prestationController.getPrestations);

router.get("/get/:id", prestationController.getPrestationByUserId);

router.post("/add/picture", prestationController.uploadPicturePresatation);

router.post("/add", prestationController.addPrestation);

router.patch("/update/is-available/:id", prestationController.updateIsAvailablePrestation);

module.exports = router;