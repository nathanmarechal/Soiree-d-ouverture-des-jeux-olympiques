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

    const body = req.body;


    rolesService.updateRole(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            console.log("data : " + data)
            return res.status(200).send(data);
        }
    });
}

exports.deleteRole = (req, res) => {
    const id = req.query.id;
    console.log("in delete role brother, id is : "+id)
    rolesService.deleteRole(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}
