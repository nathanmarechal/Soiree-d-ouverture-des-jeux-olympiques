const express = require('express');
var router = express.Router();
const standsController = require('../controllers/stands.controller');

router.get("/get", standsController.getStands);

module.exports = router;