const droitsService = require("../services/droits.service");

exports.getDroits = (req, res) => {

    const id = req.params.idRole;

    console.log("dans droits controller "+id);

    droitsService.getDroits(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}