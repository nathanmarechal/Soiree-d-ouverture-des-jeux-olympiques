const typePrestationsService = require("../services/typePrestations.service");

exports.getTypePrestations = (req, res) => {
    typePrestationsService.getAllTypePrestations((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}