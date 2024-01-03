const role_droitService = require('../services/role_droit.service');

exports.getRoleDroitAssociation = (req, res) => {
    
    console.log("path : " + req.path)

    role_droitService.getAllRoleDroitAssociation((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.createRoleDroitAssociation = (req, res) => {
        
    console.log("path : " + req.path)

    role_droitService.createRoleDroitAssociation(req.body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.deleteRoleDroitAssociation = (req, res) => {
            
    console.log("path : " + req.path)

    role_droitService.deleteRoleDroitAssociation(req.body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.deleteRoleDroitAssociationForSpecificRole = (req, res) => {
                
    console.log("path : " + req.path)

    const id_role = req.params.id_role;
    console.log("id_role : " + id_role)
    role_droitService.deleteRoleDroitAssociationForSpecificRole(id_role, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}
            
