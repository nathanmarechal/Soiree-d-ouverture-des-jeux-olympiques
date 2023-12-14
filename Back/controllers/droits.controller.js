const droitsService = require('../services/droits.service');

exports.getDroits = (req, res) => {
    
        console.log("path : " + req.path)
    
        droitsService.getAllDroits((error, data) => {
            if (error) {
                return res.status(500).send("Internal error");
            } else {
                return res.status(200).send(data);
            }
        });
    }