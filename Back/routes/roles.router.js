const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/roles.controller');
const rightMiddleware = require('../middlewares/authentication.middleware')


router.get("/get" ,rolesController.getRoles);

router.patch("/update/:id",rightMiddleware.checkRight, rolesController.updateRole);

router.post("/add",rightMiddleware.checkRight, rolesController.createRole);

router.delete("/delete",rightMiddleware.checkRight, rolesController.deleteRole);

module.exports = router;