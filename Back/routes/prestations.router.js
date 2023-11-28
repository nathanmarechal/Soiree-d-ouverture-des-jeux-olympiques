const express = require('express');
var router = express.Router();
const prestationController = require('../controllers/prestations.controller');

router.get("/get", prestationController.getPrestations);

router.get("/get/:id", prestationController.getPrestationByUserId);

router.post("/add/picture", prestationController.uploadPicturePresatation);

module.exports = router;