const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/roles.controller');

router.get("/get", rolesController.getRoles);

router.patch("/update/:id", rolesController.updateRole);

router.post("/add", rolesController.createRole);

router.delete("/delete/:id", rolesController.deleteRole);

module.exports = router;