const express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const {checkRight} = require("../middlewares/authentication.middleware");


router.get("/roles", usersController.getRoles);

router.get("/get", usersController.getUsers);

router.get("/getBySessionId",usersController.getUserBySessionId)

router.post("/post",
    (req,res,next)=>
        checkRight(req,res,next,"create_users"),
    usersController.saveUser);

//router.post("/post", usersMiddleware.validateUserInput,usersController.saveUser);

/*
router.get("/top", usersController.getUserWithLongestPrenom);

router.get("/:id", usersController.getUserById);

router.put("/:id",usersMiddleware.validateUserInput, usersController.updateUser);

router.delete("/",usersController.deleteUser);

 */

module.exports = router;