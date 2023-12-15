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

exports.deleteEmplacementLogistique = (req, res) => {
    const id = req.params.id;
    console.log("deleteEmplacementLogistique: ", id)
    emplacementLogistiqueService.deleteEmplacementLogistique(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.updateEmplacementLogistique = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log("updateEmplacementLogistique: ", id, body)
    emplacementLogistiqueService.updateEmplacementLogistique(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}