const emplacementLogistiqueService = require("../services/emplacementLogistique.service");

exports.getEmplacementLogistique = (req, res) => {
    emplacementLogistiqueService.getEmplacementLogistique((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.addEmplacementLogistique = (req, res) => {
    const body = req.body;
    emplacementLogistiqueService.addEmplacementLogistique(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
