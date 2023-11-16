const express = require('express');
var router = express.Router();
const mapController = require('../controllers/map.controller');
//const usersMiddleware = require('../middlewares/users.middleware');


router.get("/areas", mapController.getAreas);

router.get("/zones", mapController.getZones);

module.exports = router;