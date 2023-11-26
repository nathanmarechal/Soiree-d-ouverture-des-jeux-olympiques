const prestationsService = require("../services/prestations.service");

exports.getPrestations = (req, res) => {
    prestationsService.getAllPrestations((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getPrestationByUserId = (req, res) => {
    const id = req.params.id;
    prestationsService.getPrestationByUserId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}