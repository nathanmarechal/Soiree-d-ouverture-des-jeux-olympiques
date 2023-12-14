const express = require('express');
var router = express.Router();
const droitsController = require('../controllers/droits.controller');
const rolesController = require('../controllers/droits.controller');


router.get("/get", rolesController.getDroits);

router.get("/getByIdRole/:idRole", droitsController.getDroits);

module.exports = router;