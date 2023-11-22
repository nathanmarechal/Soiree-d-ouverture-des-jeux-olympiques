const express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');

router.get("/roles", usersController.getRoles);

router.get("/get", usersController.getUsers);

router.post("/post", usersController.saveUser);

//router.post("/post", usersMiddleware.validateUserInput,usersController.saveUser);

/*
router.get("/top", usersController.getUserWithLongestPrenom);

router.get("/:id", usersController.getUserById);

router.put("/:id",usersMiddleware.validateUserInput, usersController.updateUser);

router.delete("/", usersController.deleteUser);

 */

module.exports = router;