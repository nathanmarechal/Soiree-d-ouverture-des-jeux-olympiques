const express = require('express');
var router = express.Router();
const avisController = require('../controllers/avis.controller');
const homePageController = require("../controllers/homePage.controller");
const path = require("path");


router.get("/getAvisByIdStand/:id", avisController.getAvisByIdStand);

router.post("/add", avisController.addAvis);

router.post("/uploading/picture-avis", avisController.uploadingPictureAvis)

router.use('/picture-avis', express.static(path.join(__dirname,  '../assets/stand/Avis')))

router.post("/deleteAvisByIdStandUser/:id", avisController.deleteAvis);

module.exports = router;