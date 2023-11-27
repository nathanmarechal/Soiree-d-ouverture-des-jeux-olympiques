const express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const {checkRight} = require("../middlewares/authentication.middleware");

router.get("/roles", usersController.getRoles);
router.post("/roles/:id", usersController.updateRole);
router.post("/roles", usersController.createRole);
router.delete("/roles/:id", usersController.deleteRole);

router.get("/get",
    (req,res,next)=>
        checkRight(req,res,next,"see_users"),
    usersController.getUsers);

router.get("/getBySessionId",usersController.getUserBySessionId)

//router.post("/post", usersMiddleware.validateUserInput,usersController.saveUser);

router.get("/getBySessionId", usersController.getUserBySessionId);
router.post("/:id", usersController.updateUser);
router.post("/", (req, res, next) => {
    checkRight(req, res, next, "create_users");
}, usersController.createUser);

module.exports = router;