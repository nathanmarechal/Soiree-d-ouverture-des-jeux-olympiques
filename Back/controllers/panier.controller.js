const panierService = require("../services/panier.service");
const userService = require("../services/users.service");

exports.getPanierByUserId = async (req, res) => {
    const session_id = req.headers['session_id'];

    const user = await userService.getUserBySessionIdAsync(session_id);

    panierService.getPanierByUserId(user.id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateQuantityInPanier = async (req, res) => {

    const session_id = req.headers['session_id'];

    const user = await userService.getUserBySessionIdAsync(session_id);

    const id_prestation = req.body.id_prestation;
    const quantite = req.body.quantite;
    const id_creneau = req.body.id_creneau;
    panierService.updateQuantityInPanier(user.id_user, id_prestation, quantite, id_creneau, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deletePrestationFromPanierUser = async (req, res) => {
    const session_id = req.headers['session_id'];

    const user = await userService.getUserBySessionIdAsync(session_id);

    const id_prestation = req.query.presta;
    const id_creneau = req.query.creneau;
    panierService.deletePrestationFromPanierUser(user.id_user, id_prestation, id_creneau, (error, data) => {
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

exports.addPrestationToPanierUser = async (req, res) => {

    const session_id = req.headers['session_id'];

    const user = await userService.getUserBySessionIdAsync(session_id);

    const id_prestation = req.body.id_prestation;
    const quantite = req.body.quantite;
    const id_creneau = req.body.id_creneau;
    panierService.addPrestationToPanier(user.id_user, id_prestation,  id_creneau, quantite,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}