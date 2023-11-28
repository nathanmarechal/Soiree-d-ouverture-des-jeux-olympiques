const express = require('express');
var router = express.Router();
const loginController = require('../controllers/authentication.controller');

router.get("/",loginController.getLoginToken);

module.exports = router;