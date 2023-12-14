const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/role_droit.controller');

router.get("/get", rolesController.getRoleDroitAssociation);
router.post("/add", rolesController.createRoleDroitAssociation);
router.post("/delete", rolesController.deleteRoleDroitAssociation);

module.exports = router;