const mapService = require("../services/map.service");


exports.getAreas = (req, res) => {
    mapService.getAllAreas((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getZones = (req, res) => {
    mapService.getAllZones((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}