const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/role_droit.controller');

router.get("/get", rolesController.getRoleDroitAssociation);
router.post("/add", rolesController.createRoleDroitAssociation);
router.delete("/delete", rolesController.deleteRoleDroitAssociation);
router.delete("/delete/:id_role", rolesController.deleteRoleDroitAssociationForSpecificRole);

module.exports = router;