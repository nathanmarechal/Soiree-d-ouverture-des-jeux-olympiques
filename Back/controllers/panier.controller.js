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