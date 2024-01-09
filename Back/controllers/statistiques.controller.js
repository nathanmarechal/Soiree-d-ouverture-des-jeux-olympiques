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

exports.getNbStands = (req, res) => {
    statistiquesService.getNbStands((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getNbPrestationsAvailable = (req, res) => {
    statistiquesService.getNbPrestationsAvailable((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getNbUsers = (req, res) => {
    statistiquesService.getNbUsers((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getAveragePurchase = (req, res) => {
    statistiquesService.getAveragePurchase((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getTopSellerStand = (req, res) => {
    statistiquesService.getTopSellerStand((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getTopAvisStand = (req, res) => {
    statistiquesService.getTopAvisStand((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getNbPrestationHeure = (req, res) => {
    const id = req.params.id;
    statistiquesService.getNbPrestationHeure(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getAveragePurchaseByStand = (req, res) => {
    const id = req.params.id;
    statistiquesService.getAveragePurchaseByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getBestClientByStand = (req, res) => {
    const id = req.params.id;
    statistiquesService.getBestClientByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getSalesRevnueByTypeByStand = (req, res) => {
    const id = req.params.id;
    statistiquesService.getSalesRevnueByTypeByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getAvgRatingByStand = (req, res) => {
    const id = req.params.id;
    statistiquesService.getAvgRatingByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getCountRatingByStand = (req, res) => {
    const id = req.params.id;
    statistiquesService.getCountRatingByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}