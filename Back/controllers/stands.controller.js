const standsService = require("../services/stands.service");

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

exports.getStandsAttente = (req, res) => {
    standsService.getAllStandsAttente((error, data) => {
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
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteStand = (req, res) => {
    const id = req.params.id;
    standsService.deleteStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.createStand = (req, res) => {
    const body = req.body;
    standsService.createStand(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.updateStand = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    standsService.updateStand(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.uploadPictureStand = (req, res) => {
    standsService.uploadPictureStand(req, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            console.log(data)
            return res.status(200).send(data);
        }
    });
};


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
    standsService.updateStandDescription(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
