const usersService = require("../services/users.service");

exports.saveUser = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    console.log(nom, " ", prenom);
    usersService.createUser(prenom, nom, (error, data) => {
        if (error) {
            return res.status(500).send("error");
        }
        else {
            return res.status(200).send("User created successfully");
        }
    })
} //POSTMAN: POST http://localhost:3000/users/  Body: raw JSON {"nom":"NOTTER","prenom":"Mathias"}

exports.getUsers = (req, res) => {
    usersService.getAllUsers((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
} //POSTMAN: GET http://localhost:3000/users/

exports.getUserById = (req, res) => {
    const id = req.params.id;
    usersService.getUserById(id, (error, data) => {
        if (error) {
            return res.status(500).send("internal error");
        }
        if (!data || data.length === 0){
            return res.status(404).send("User not found");
        }

        return res.status(200).send(data);
    })
}


exports.getRoles = (req, res) => {
    usersService.getAllRoles((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getUserWithLongestPrenom = (req, res) => {
    usersService.getUserWithLongestPrenom((error, data) => {
        if (error) {
            return res.status(500).send("internal error");
        }
        if (!data || data.length === 0){
            return res.status(404).send("User not found");
        }

        return res.status(200).send(data);
    })
}

exports.updateUser = (req, res) => {
    const uuid = req.params.id;
    const {nom, prenom} = req.body;
    usersService.updateUser(uuid, nom, prenom, (error, data) => {
        if (error) {
            if (error == "User not found"){
                return res.status(404).send("User not found");
            }
            return res.status(500).send("internal error");
        }
        return res.status(200).send(data);
    })
}

exports.deleteUser = (req, res) => {
    const id = req.query.id;
    if (!id){
        return res.status(400).send("id is null");
    }
    usersService.deleteUser(id, (error, data) => {
        if (error) {
            if (error == "User not found"){
                return res.status(404).send("User not found");
            }
            return res.status(500).send("internal error");
        }
        return res.status(200).send(data);
    })
}