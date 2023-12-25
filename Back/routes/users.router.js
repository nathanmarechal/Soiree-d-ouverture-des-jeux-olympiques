const express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const {checkRight} = require("../middlewares/authentication.middleware");
const loginMiddleware = require("../middlewares/authentication.middleware");

/*
router.get("/roles", usersController.getRoles);

router.patch("/roles/:id", usersController.updateRole);

router.post("/roles", usersController.createRole);

router.delete("/roles/:id", usersController.deleteRole);
 */



router.get("/get", usersController.getUsers);

router.get("/getBySessionId",usersController.getUserBySessionId)

router.patch("/update/:id", usersController.updateUser);

router.delete("/delete/:id", usersController.deleteUser);

router.patch("/updateSolde", usersController.updateSolde);

router.patch("/updateSolde", usersController.updateSolde);

router.patch("/updateUserCourantWoPassword", usersController.updateUserCourantWoPassword);
router.post("/registerClient", loginMiddleware.checkRight, usersController.createUser);
router.post("/registerPrestataire", usersController.createUserWithStand);
router.get("/getUserAttente", usersController.getUsersAttente);
router.post("/acceptUser/:id", usersController.acceptUser);
router.post("/refuseUser/:id", usersController.refuseUser);


router.post("/", (req, res, next) => {
    checkRight(req, res, next, "create_users");
}, usersController.createUser);

module.exports = router;