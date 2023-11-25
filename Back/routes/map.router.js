const express = require('express');
var router = express.Router();
const mapController = require('../controllers/map.controller');

router.get("/typeZones", mapController.getTypeZones);

router.get("/areas", mapController.getAreas);

router.patch("/area/:id", mapController.updateArea);

router.delete("/area/:id", mapController.deleteArea);

router.post("/area", mapController.createArea);

router.get("/zones", mapController.getZones);

router.get("/zone", mapController.getZoneById);

module.exports = router;