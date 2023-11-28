const panierService = require("../services/panier.service");


exports.getPanierByUserId = (req, res) => {
    const id = req.params.id;
    panierService.getPanierByUserId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deletePrestationFromPanierUser = (req, res) => {
    console.log(req.query.id, req.query.presta, "deletePrestationFromPanierUser dans le controlleur panier.controller.js");
    const id_user = req.query.id;
    const id_prestation = req.query.presta;
    panierService.deletePrestationFromPanierUser(id_user, id_prestation, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

