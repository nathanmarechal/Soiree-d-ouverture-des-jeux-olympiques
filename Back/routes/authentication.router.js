const express = require('express');
var router = express.Router();
const loginController = require('../controllers/authentication.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

router.post("/",loginController.getLoginToken);

module.exports = router;