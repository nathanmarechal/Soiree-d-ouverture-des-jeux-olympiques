const commandeService = require("../services/commande.service");


exports.getCommandeByUserId = (req, res) => {
    const id = req.params.id;
    console.log("dans le controller" + id)
    commandeService.getCommandeByUserId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.addCommande = (req, res) => {
    const id_user = req.body.id_user;
    console.log(id_user, "id_user dans le controlleur commande.controller.js")
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
