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
    const solde = req.body.solde;

    usersService.createUser(prenom, nom, email, password, adresse, code_postal, commune, id_role, solde, (error, data) => {
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
    usersService.getAllUsers((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.getUsersAttente = (req, res) => {
    usersService.getAllUsersAttente((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.acceptUser = (req, res) => {
    const id_user = req.query.id_user;
    usersService.acceptUser(id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.refuseUser = (req, res) => {
    const id_user = req.query.id_user;
    usersService.refuseUser(id_user, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send("User refused successfully");
        }
    });
}

exports.getUserById = (req, res) => {
    const id = req.query.id_user;
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
    usersService.getUserBySessionId(session_id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateUser = (req, res) => {
    const id_user = req.query.id_user;
    const { prenom, nom, email, password, adresse, code_postal, commune, solde, id_role, id_stand } = req.body;
    usersService.updateUser(id_user, prenom, nom, email, password, adresse, code_postal, commune, solde, id_role, id_stand, (error, data) => {
        if (error) {
            return res.status(500).send("internal error");
        }
        return res.status(200).send(data);
    });
}

exports.deleteUser = (req, res) => {
    const id = req.query.id_user;

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

exports.updateSolde = async (req, res) => {
    const session_id = req.query.session_id;

    const user_courant = await usersService.getUserBySessionIdAsync(session_id);

    const newsolde = req.body.solde;

    usersService.updateSolde(user_courant.id_user, newsolde, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateUserCourantWoPassword = async (req, res) => {

    const session_id = req.query.session_id;
    const user_courant = await usersService.getUserBySessionIdAsync(session_id);

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const adresse = req.body.adresse;
    const code_postal = req.body.code_postal;
    const commune = req.body.commune;

    console.log("session_id : " + session_id + " id : " + user_courant.id_user + " nom : " + nom + " prenom : " + prenom + " email : " + email + " adresse : " + adresse + " code_postal : " + code_postal + " commune : " + commune)

    usersService.updateUserCourantWoPassword(user_courant.id_user, nom, prenom, email, adresse, code_postal, commune, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send(data);
    });
}
