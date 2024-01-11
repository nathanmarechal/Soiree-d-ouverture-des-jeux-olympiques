const path = require('path');
const prestationsService = require("../services/prestations.service");

exports.getPrestations = (req, res) => {
    prestationsService.getAllPrestations((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.uploadPicturePresatation = (req, res) => {
    prestationsService.uploadPicturePresatation(req, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
};

exports.addPrestation = (req, res) => {
    const libelle = req.body.libelle;
    const prix = req.body.prix;
    const image = req.body.image;
    const id_type_prestation = req.body.id_type_prestation;
    const id_stand = req.body.id_stand;
    const is_available = req.body.is_available;
    prestationsService.addPrestation(libelle, prix, image, id_type_prestation, id_stand,is_available, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(201).send(data);
        }
    })
}

exports.updateIsAvailablePrestation = (req, res) => {
    const id = req.query.id_prestation;
    prestationsService.updateIsAvailablePrestation(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updatePrestation = (req, res) => {
    const id = req.query.id_prestation;
    const body = req.body;
    prestationsService.updatePrestation(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.deletePrestation = (req, res) => {
    const id = req.query.id_prestation;
    prestationsService.deletePrestation(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send("Prestation deleted successfully");
        }
    })
}
