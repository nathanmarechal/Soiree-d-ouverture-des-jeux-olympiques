const usersService = require("../services/users.service");

exports.createUser = (req, res) => {
    const nom = req.body.lastName;
    const prenom = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const adresse = req.body.adresse;
    const code_postal = req.body.code_postal;
    const commune = req.body.commune;
    const id_role = req.body.id_role;

    console.log("----------")
    console.log("createUser", { nom, prenom, email, password, adresse, code_postal, commune, id_role });
    console.log("----------")

    usersService.createUser(prenom, nom, email, password, adresse, code_postal, commune, id_role, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(201).send(data);
        }
    });
}

exports.createUserWithStand = (req, res) => {
    const nom = req.body.user.lastName;
    const prenom = req.body.user.firstName;
    const email = req.body.user.email;
    const password = req.body.user.password;
    const adresse = req.body.user.adresse;
    const code_postal = req.body.user.code_postal;
    const commune = req.body.user.commune;
    const id_role = req.body.user.id_role;

    const nom_stand = req.body.stand.nom_stand;
    const image_stand = req.body.stand.image_stand;
    const description_stand = req.body.stand.description_stand;

    console.log(description_stand)
    const prix_stand = 0;
    const id_emplacement = req.body.stand.id_emplacement;

    usersService.createUserWithStand(prenom, nom, email, password, adresse, code_postal, commune, id_role, nom_stand, image_stand, description_stand, prix_stand, id_emplacement, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(201).send(data);
        }
    });
}

exports.getUsers = (req, res) => {
    console.log("getUsers");

    usersService.getAllUsers((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.getUsersAttente = (req, res) => {
    // Log function name
    console.log("getUsersAttente");

    usersService.getAllUsersAttente((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.acceptUser = (req, res) => {
    const id_user = req.params.id;

    console.log("acceptUser", id_user);

    usersService.acceptUser(id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("User accepted successfully");
        }
    });
}

exports.refuseUser = (req, res) => {
    const id_user = req.params.id;

    console.log("refuseUser", id_user);

    usersService.refuseUser(id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("User refused successfully");
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

exports.updateUser = (req, res) => {
    const id_user = req.params.id;
    const { prenom, nom, email, password, adresse, code_postal, commune, solde, id_role, id_stand } = req.body;

    // Log function name and data
    console.log("updateUser", { id_user, prenom, nom, email, password, adresse, code_postal, commune, solde, id_role, id_stand });

    usersService.updateUser(id_user, prenom, nom, email, password, adresse, code_postal, commune, solde, id_role, id_stand, (error, data) => {
        if (error) {
            return res.status(500).send("internal error");
        }
        return res.status(200).send(data);
    });
}

exports.deleteUser = (req, res) => {
    console.log("deleting the user willy nilly");
    const id = req.query.id_user;

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
        return res.status(200).send("Utilisateur supprimé avec succès");
    });
}

exports.updateSolde = (req, res) => {
    const id = req.body.id_user;
    const newsolde = req.body.solde;

    console.log("updateSolde", { id, newsolde });

    console.log(typeof id);
    console.log(typeof newsolde);

    usersService.updateSolde(id, newsolde, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateUserCourantWoPassword = (req, res) => {
    const id = req.body.id_user;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const adresse = req.body.adresse;
    const code_postal = req.body.code_postal;
    const commune = req.body.commune;

    console.log("updateUserCourantWoPassword", { id, nom, prenom, email, adresse, code_postal, commune });

    usersService.updateUserCourantWoPassword(id, nom, prenom, email, adresse, code_postal, commune, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send(data);
    });
}
