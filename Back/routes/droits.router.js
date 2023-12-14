const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/droits.controller');

router.get("/get", rolesController.getDroits);

module.exports = router;