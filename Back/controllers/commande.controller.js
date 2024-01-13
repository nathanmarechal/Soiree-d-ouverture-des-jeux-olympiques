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

exports.addCommande = async (req, res) => {
    const session_id = req.query.session_id;

    const user = await userService.getUserBySessionIdAsync(session_id);

    commandeService.addCommande(user.id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.getLigneCommandeBycommandeId = (req, res) => {
    const id = req.query.id_commande

    commandeService.getLigneCommandeBycommandeId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.getScheduleByUserId = async (req, res) => {
    const session_id = req.query.session_id;

    const user = await userService.getUserBySessionIdAsync(session_id)

    commandeService.getScheduleByUserId(user.id_user, (error, data) => {
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

    commandeService.setEtatLigneCommandeExterieur({ id_commande, id_presta, id_creneau }, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.getCommandesPrestataires = async (req, res) => {
    const session_id = req.query.session_id;

    const user = await userService.getUserBySessionIdAsync(session_id);

    commandeService.getCommandesPrestataires(user.id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}