const standsService = require("../services/stands.service");
const usersService = require("../services/users.service");

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
    const id = req.query.id_stand;
    standsService.getStandById(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteStand = (req, res) => {
    const id = req.query.id_stand;
    standsService.deleteStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("Stand deleted successfully");
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
    const id = req.query.id_stand;
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
            return res.status(200).send(data);
        }
    });
};


exports.uploadingPictureDescription = (req, res) => {
    standsService.uploadingPictureDescription(req, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
};

exports.updateStandDescription = async (req, res) => {
    const session_id = req.query.session_id;

    const user_courant = await usersService.getUserBySessionIdAsync(session_id);

    const body = req.body;

    standsService.updateStandDescription(user_courant.id_user, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
