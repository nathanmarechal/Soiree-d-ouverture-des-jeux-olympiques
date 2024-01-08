const express = require('express');
var router = express.Router();
const mapController = require('../controllers/map.controller');
const rightMiddleware = require('../middlewares/authentication.middleware')

router.get("/get-all-type-zones", mapController.getTypeZones);

router.get("/get-all-areas", mapController.getAreas);

router.patch("/update-area/:id", mapController.updateArea);

router.delete("/delete-area/:id", mapController.deleteArea);

router.post("/create-area", mapController.createArea);

router.get("/get-all-zones",rightMiddleware.checkRight, mapController.getZones);

router.get("/get-zone",rightMiddleware.checkRight, mapController.getZoneById); // avec query

router.patch("/update-zone",rightMiddleware.checkRight, mapController.updateZone);

router.delete("/delete-zone",rightMiddleware.checkRight, mapController.deleteZone);

router.post("/create-zone",rightMiddleware.checkRight, mapController.createZone);

module.exports = router;