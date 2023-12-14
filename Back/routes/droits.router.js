const express = require('express');
var router = express.Router();
const droitsController = require('../controllers/droits.controller');

router.get("/get/:idRole", droitsController.getDroits);

module.exports = router;