const express = require('express');
var router = express.Router();
const path = require('path');
const homePageController = require("../controllers/homePage.controller");

router.patch("/description/:id", homePageController.updateHomePageDescription);

router.post("/uploading/picture-description", homePageController.uploadingPictureHomePageDescription)

router.use('/picture-description', express.static(path.join(__dirname,  '../assets/homePage/description')))

router.get("/getAllDescription", homePageController.getAllDescription);

module.exports = router;