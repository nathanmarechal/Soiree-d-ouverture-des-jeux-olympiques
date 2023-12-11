const usersService = require("../services/users.service");

exports.createUser = (req, res) => {
    const nom = req.body.lastName;
    const prenom = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const adresse = req.body.adresse;
    const code_postal = req.body.code_postal;
    const commune = req.body.commune;
    const id_role = req.body.id_role.id_role;
    const id_stand = req.body.id_stand;
    //const session_id = req.body.session_id;

    // Log function name and data
    console.log("createUser", { nom, prenom, email, password, adresse, code_postal, commune, id_role, id_stand });

    usersService.createUser(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand, (error, data) => {
        if (error) {
            return res.status(500).send("error");
        } else {
            return res.status(200).send("User created successfully");
        }
    });
}

exports.getUsers = (req, res) => {
    // Log function name
    console.log("getUsers");

    usersService.getAllUsers((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.getUserById = (req, res) => {
    const id = req.params.id;

    // Log function name and data
    console.log("getUserById", { id });

    usersService.getUserById(id, (error, data) => {
        if (error) {
            return res.status(500).send("internal error");
        }
        if (!data || data.length === 0) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(data);
    });
}

exports.getUserBySessionId = (req, res) => {
    const session_id = req.query.session_id;

    // Log function name and data
    console.log("getUserBySessionId", { session_id });

    usersService.getUserBySessionId(session_id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            console.log("sending the data" + data.id_role);
            return res.status(200).send(data);
        }
    });
}

exports.getRoles = (req, res) => {
    // Log function name
    console.log("getRoles");

    usersService.getAllRoles((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.getUserWithLongestPrenom = (req, res) => {
    // Log function name
    console.log("getUserWithLongestPrenom");

    usersService.getUserWithLongestPrenom((error, data) => {
        if (error) {
            return res.status(500).send("internal error");
        }
        if (!data || data.length === 0) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(data);
    });
}

exports.updateUser = (req, res) => {
    const { prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand } = req.body;

    // Log function name and data
    console.log("updateUser", { prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand });

    usersService.updateUser(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand, (error, data) => {
        if (error) {
            if (error === "User not found") {
                return res.status(404).send("User not found");
            }
            return res.status(500).send("internal error");
        }
        return res.status(200).send(data);
    });
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    // Log function name and data
    console.log("deleteUser", { id });

    if (!id) {
        return res.status(400).send("id is null");
    }

    usersService.deleteUser(id, (error, data) => {
        if (error) {
            if (error === "User not found") {
                return res.status(404).send("User not found");
            }
            return res.status(500).send("internal error");
        }
        return res.status(200).send(data);
    });
}

exports.createRole = (req, res) => {
    const body = req.body;

    // Log function name and data

    usersService.createRole(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateRole = (req, res) => {
    const id = req.params.id;
    const body = req.body.solde;

    // Log function name and data
    console.log("updateRole", { id, body });

    usersService.updateRole(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.deleteRole = (req, res) => {
    const id = req.params.id;

    // Log function name and data
    console.log("deleteRole", { id });

    usersService.deleteRole(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateSolde = (req, res) => {
    const id = req.body.id_user;
    const newsolde = req.body.solde;

    console.log("updateSolde", { id, newsolde });

    usersService.updateSolde(id, newsolde, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateNom = (req, res) => {
    const id = req.body.id_user;
    const nom = req.body.nom;

    console.log("updateNom", { id, nom });

    usersService.updateNom(id, nom, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updatePrenom = (req, res) => {
    const id = req.body.id_user;
    const prenom = req.body.prenom;

    console.log("updatePrenom", { id, prenom });

    usersService.updatePrenom(id, prenom, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateEmail = (req, res) => {
    const id = req.body.id_user;
    const email = req.body.email;

    console.log("updateEmail", { id, email });

    usersService.updateEmail(id, email, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}
