const statistiquesService = require("../services/statistiques.service");

exports.getBestSellerPrestation = (req, res) => {
    statistiquesService.getBestSellerPrestation((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getNewStandByMonth = (req, res) => {
    statistiquesService.getNewStandByMonth((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}