const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/roles.controller');

router.get("/get-role", rolesController.getRoles);

router.patch("/update-role/:id", rolesController.updateRole);

router.post("/create-role", rolesController.createRole);

router.delete("/delete-role/:id", rolesController.deleteRole);

module.exports = router;