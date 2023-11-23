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