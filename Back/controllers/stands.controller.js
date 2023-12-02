const standsService = require("../services/stands.service");

const multer = require('multer');
const path = require('path');
const mapService = require("../services/map.service");

exports.getStands = (req, res) => {
    standsService.getAllStands((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getStandById = (req, res) => {
    const id = req.params.id;
    standsService.getStandById(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.uploadingPictureDescription = (req, res) => {
    standsService.uploadingPictureDescription(req, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            console.log(data)
            return res.status(200).send(data);
        }
    });
};

exports.updateStandDescription = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log("updateZone: ", id, body)
    standsService.updateStandDescription(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
