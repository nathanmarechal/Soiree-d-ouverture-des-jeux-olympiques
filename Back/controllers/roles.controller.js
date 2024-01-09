const rolesService = require("../services/roles.service");

exports.getRoles = (req, res) => {
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
    const id = req.query.id_role;
    const body = req.body;
    rolesService.updateRole(id, body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.deleteRole = (req, res) => {
    const id = req.query.id_role;
    rolesService.deleteRole(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("Role deleted successfully");
        }
    });
}
