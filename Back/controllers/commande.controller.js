const commandeService = require("../services/commande.service");
const userService = require("../services/users.service");

exports.getCommandeByUserId = async (req, res) => {
    const session_id = req.query.session_id;

    const user = await userService.getUserBySessionIdAsync(session_id);

    commandeService.getCommandeByUserId(user.id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.addCommande = (req, res) => {

    const id_user = req.body.id_user;
    console.log("id_user:" + id_user + " dans le controller commande.controller.js")

    commandeService.addCommande(id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.getLigneCommandeBycommandeId = (req, res) => {
    const id = req.params.id;
    console.log("dans le controller" + id)
    commandeService.getLigneCommandeBycommandeId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.getScheduleByUserId = (req, res) => {
    const id = req.params.id;
    console.log("dans le controller" + id)
    commandeService.getScheduleByUserId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.setEtatLigneCommandeExterieur = (req, res) => {
    const id_presta = req.body.id_prestation;
    const id_creneau = req.body.id_creneau;
    const id_commande = req.body.id_commande;
    console.log("id_presta:" + id_presta + ", id_creneau:" + id_creneau + ", id_commande:" + id_commande + " dans le controller commande.controller.js")
    commandeService.setEtatLigneCommandeExterieur({ id_presta, id_creneau, id_commande}, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.getCommandesPrestataires = (req, res) => {
    const id = req.params.id;
    console.log("dans le controller" + id)
    commandeService.getCommandesPrestataires(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}