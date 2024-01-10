const avisService = require("../services/avis.service");
const homePageService = require("../services/homePage.service");


exports.getAvisByIdStand = (req, res) => {
    const id = req.query.id_stand;
    avisService.getAvisByIdStand(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    })
}

exports.uploadingPictureAvis = (req, res) => {
    avisService.uploadingPictureAvis(req, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            console.log(data)
            return res.status(200).send(data);
        }
    });
};


exports.addAvis = (req, res) => {
    const avis = req.body;
    avisService.addAvis(avis, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(201).send(data);
        }
    })
}

exports.deleteAvis = (req, res) => {
    const id = req.query.id_avis;
    avisService.deleteAvis(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("Avis deleted successfully");
        }
    })
}