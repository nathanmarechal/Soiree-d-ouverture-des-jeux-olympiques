const express = require('express');
var router = express.Router();
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

router.post("/",loginMiddleware.validateUserInput,loginController.getLoginToken);

module.exports = router;