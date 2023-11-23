const usersService = require("../services/users.service");

exports.saveUser = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;
    const adresse = req.body.adresse;
    const code_postal = req.body.code_postal;
    const commune = req.body.commune;
    const id_role = req.body.id_role;
    const id_stand = req.body.id_stand;
    const session_id = req.body.session_id;
    console.log(nom, " ", prenom, " ", email, " ", password, " ", adresse, " ", code_postal, " ", commune, " ", id_role, " ", id_stand," ",session_id);
    usersService.createUser(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand,(error, data) => {
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