const express = require('express');
var router = express.Router();
const mapController = require('../controllers/map.controller');

router.get("/typeZones", mapController.getTypeZones);

router.get("/areas", mapController.getAreas);

router.get("/zone", mapController.getZoneById);

router.get("/zones", mapController.getZones);


module.exports = router;