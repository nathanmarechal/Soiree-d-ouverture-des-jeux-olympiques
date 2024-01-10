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

exports.updateQuantityInPanier = (req, res) => {
    const id_user = req.body.id_user;
    const id_prestation = req.body.id_prestation;
    const quantite = req.body.quantite;
    const id_creneau = req.body.id_creneau;
    panierService.updateQuantityInPanier(id_user, id_prestation, quantite, id_creneau, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })

}

exports.deletePrestationFromPanierUser = (req, res) => {
    const id_user = req.query.id;
    const id_prestation = req.query.presta;
    const id_creneau = req.query.creneau;
    panierService.deletePrestationFromPanierUser(id_user, id_prestation, id_creneau, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getAllCreneaux = (req, res) => {
    panierService.getAllCreneaux((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.addPrestationToPanierUser = (req, res) => {
    const id_user = req.body.id_user;
    const id_prestation = req.body.id_prestation;
    const quantite = req.body.quantite;
    const id_creneau = req.body.id_creneau;
    console.log("id_user:" + id_user + ", id_prestation:" + id_prestation + " dans le controller panier.controller.js" + ", quantite:" + quantite + ", id_creneau:" + id_creneau)
    panierService.addPrestationToPanier(id_user, id_prestation, quantite, id_creneau, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}