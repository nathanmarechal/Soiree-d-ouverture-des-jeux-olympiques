const express = require('express');
var router = express.Router();
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

router.get("/",loginMiddleware.validateUserInput,loginController.getLoginToken);

module.exports = router;