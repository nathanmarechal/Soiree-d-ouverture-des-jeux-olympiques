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
            return res.status(201).send(data);
        }
    })
}

exports.deleteEmplacementLogistique = (req, res) => {
    const id = req.query.id_emplacement_logistique;
    console.log("deleteEmplacementLogistique: ", id)
    emplacementLogistiqueService.deleteEmplacementLogistique(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send("Emplacement logistique deleted successfully");
        }
    })
}


exports.updateEmplacementLogistique = (req, res) => {
    const id = req.query.id_emplacement_logistique;
    const body = req.body;
    emplacementLogistiqueService.updateEmplacementLogistique(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}