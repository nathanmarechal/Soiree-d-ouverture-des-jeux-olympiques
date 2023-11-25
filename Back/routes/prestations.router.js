const express = require('express');
var router = express.Router();
const prestationController = require('../controllers/prestations.controller');

router.get("/get", prestationController.getPrestations);

module.exports = router;