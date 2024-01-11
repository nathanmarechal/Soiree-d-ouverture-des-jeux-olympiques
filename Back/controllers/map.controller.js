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

exports.updateArea = (req, res) => {
    const id = req.query.id_emplacement;
    const body = req.body;
    mapService.updateArea(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createArea = (req, res) => {
    const body = req.body;
    mapService.createArea(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteArea = (req, res) => {
    const id_emplacement = req.query.id_emplacement;
    mapService.deleteArea(id_emplacement, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send("Successfully deleted area");
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

exports.getZoneById = (req, res) => {
    const id = req.query.id_zone;
    mapService.getZoneById(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateZone = (req, res) => {
    const id = req.query.id_zone;
    const body = req.body;
    mapService.updateZone(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createZone = (req, res) => {
    const body = req.body;
    mapService.createZone(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteZone = (req, res) => {
    const id = req.query.id_zone;
    mapService.deleteZone(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send("Zone deleted successfully");
        }
    })
}

exports.getTypeZones = (req, res) => {
    mapService.getAllTypeZones((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}