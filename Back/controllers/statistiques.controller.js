const statistiquesService = require("../services/statistiques.service");
const standsService = require("../services/stands.service");

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

exports.getNbPrestationHeure = async (req, res) => {

    const session_id = req.query.session_id;
    const stand =  await standsService.getStandBySessionIdAsync(session_id)
    const id = stand.id_stand;

    statistiquesService.getNbPrestationHeure(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getAveragePurchaseByStand = async (req, res) => {

    const session_id = req.query.session_id;
    const stand =  await standsService.getStandBySessionIdAsync(session_id)
    const id = stand.id_stand;

    statistiquesService.getAveragePurchaseByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getBestClientByStand = async (req, res) => {
    const session_id = req.query.session_id;

    console.log(session_id)

    const stand =  await standsService.getStandBySessionIdAsync(session_id)

    console.log("stand : "+stand)

    const id_stand = stand.id_stand;

    statistiquesService.getBestClientByStand(id_stand, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getSalesRevnueByTypeByStand = async (req, res) => {
    const session_id = req.query.session_id;
    const stand =  await standsService.getStandBySessionIdAsync(session_id)
    const id = stand.id_stand;

    statistiquesService.getSalesRevnueByTypeByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getAvgRatingByStand = async (req, res) => {
    const session_id = req.query.session_id;
    const stand =  await standsService.getStandBySessionIdAsync(session_id)
    const id = stand.id_stand;
    statistiquesService.getAvgRatingByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getCountRatingByStand = async (req, res) => {

    const session_id = req.query.session_id;
    const stand =  await standsService.getStandBySessionIdAsync(session_id)
    const id = stand.id_stand;

    statistiquesService.getCountRatingByStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}