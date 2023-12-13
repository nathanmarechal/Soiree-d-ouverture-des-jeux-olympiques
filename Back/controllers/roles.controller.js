const rolesService = require("../services/roles.service");

exports.getRoles = (req, res) => {

    console.log("path : " + req.path)

    rolesService.getAllRoles((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.createRole = (req, res) => {
    const body = req.body;
    rolesService.createRole(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateRole = (req, res) => {

    //console.log("path : " + req.url)

    var fullUrl = req.originalUrl;

    console.log("fullUrl : " + fullUrl)

    const id = req.params.id;
    const body = req.body.solde;
    rolesService.updateRole(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.deleteRole = (req, res) => {
    const id = req.params.id;
    rolesService.deleteRole(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}