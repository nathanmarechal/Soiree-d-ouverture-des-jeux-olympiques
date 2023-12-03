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
