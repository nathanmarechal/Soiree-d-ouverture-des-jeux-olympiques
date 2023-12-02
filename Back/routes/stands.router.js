const express = require('express');
var router = express.Router();
const standsController = require('../controllers/stands.controller');
const path = require('path');

router.get("/get", standsController.getStands);
router.post("/uploading/picture-description", standsController.uploadingPictureDescription)
router.use('/picture-description', express.static(path.join(__dirname,  '../assets/stand/description')))

module.exports = router;