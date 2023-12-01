const express = require('express');
var router = express.Router();
const standsController = require('../controllers/stands.controller');
const multer = require('multer');
const path = require('path');

router.get("/get", standsController.getStands);

//router.post("/uploading/profile-picture", standsController.uploadStands);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../assets/stand/description');
        cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    const fileUrl = `http://localhost:3000/api/stands/uploads/${req.file.filename}`;
    res.json({ location: fileUrl });
});

router.use('/uploads', express.static(path.join(__dirname,  '../assets/stand/description')));

module.exports = router;