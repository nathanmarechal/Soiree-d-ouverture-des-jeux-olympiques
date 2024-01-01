const avisService = require("../services/avis.service");


exports.getAvisByIdStand = (req, res) => {
    const id = req.params.id;
    console.log("dans le controller" + id)
    avisService.getAvisByIdStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.addAvis = (req, res) => {
    const avis = req.body;
    avisService.addAvis(avis, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteAvis = (req, res) => {
    const id = req.params.id;
    avisService.deleteAvis(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}