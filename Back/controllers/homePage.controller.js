const homePageService = require("../services/homePage.service");


exports.uploadingPictureHomePageDescription = (req, res) => {
    homePageService.uploadingPictureHomePageDescription(req, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
};

exports.updateHomePageDescription = (req, res) => {
    const id = req.query.id_text_accueil
    const body = req.body;
    homePageService.updateHomePageDescription(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getAllDescription = (req, res) => {
    homePageService.getAllDescription((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}