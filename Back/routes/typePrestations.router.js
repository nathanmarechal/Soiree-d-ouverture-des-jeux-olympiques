const express = require('express');
var router = express.Router();
const typePrestationController = require('../controllers/typePrestations.controller');

router.get("/get", typePrestationController.getTypePrestations);

module.exports = router;