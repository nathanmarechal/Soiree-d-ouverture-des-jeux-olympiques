const role_droitService = require('../services/role_droit.service');

exports.getRoleDroitAssociation = (req, res) => {
    role_droitService.getAllRoleDroitAssociation((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.createRoleDroitAssociation = (req, res) => {
    role_droitService.createRoleDroitAssociation(req.body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.deleteRoleDroitAssociation = (req, res) => {
    role_droitService.deleteRoleDroitAssociation(req.body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("Role_droit association deleted successfully");
        }
    });
}

exports.deleteRoleDroitAssociationForSpecificRole = (req, res) => {
    const id_role = req.query.id_role;
    role_droitService.deleteRoleDroitAssociationForSpecificRole(id_role, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("Role_droit association deleted successfully for the specified role");
        }
    });
}
            
