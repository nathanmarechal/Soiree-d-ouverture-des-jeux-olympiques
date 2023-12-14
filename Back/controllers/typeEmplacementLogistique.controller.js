const typeEmplacementLogistiqueService = require("../services/typeEmplacementLogistique.service");

exports.getTypeEmplacementLogistique = (req, res) => {
    typeEmplacementLogistiqueService.getTypeEmplacementLogistique((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}