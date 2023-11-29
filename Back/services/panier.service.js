const pool = require("../database/db");


async function getPanierByUserIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT Ligne_panier.id_user ,p.id_prestation,c.heure_creneau, p.libelle, p.prix,quantite, p.image, tp.id_type_prestation, tp.libelle as type_prestation_libelle FROM ligne_panier JOIN prestation p on p.id_prestation = ligne_panier.id_prestation JOIN type_prestation tp on tp.id_type_prestation = p.id_type_prestation JOIN creneau c on c.id_creneau = ligne_panier.id_creneau WHERE id_user = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getPanierByUserIdAsync:', error);
        throw error;
    }
}

async function deletePrestationFromPanierUserAsync(id_user, id_prestation) {
    try {
        console.log("id_user:" + id_user + ", id_prestation:" + id_prestation + " dans le service panier.service.js")
        const conn = await pool.connect();
        await conn.query("DELETE FROM ligne_panier WHERE id_user = $1 AND id_prestation = $2;", [id_user, id_prestation]);
        conn.release();
    } catch (error) {
        console.error('Error in deletePrestationFromPanierUser:', error);
        throw error;
    }
}

async function getAllCreneauxAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM creneau");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllCreneauxAsync:', error);
        throw error;
    }
}

async function addPrestationToPanierAsync(id_user, id_prestation, id_creneau, quantite) {
    try {
        const conn = await pool.connect();
        await conn.query("INSERT INTO Ligne_panier (id_user, id_prestation, quantite, id_creneau) VALUES ($1, $2, $3, $4);", [id_user, id_prestation, id_creneau, quantite]);
        conn.release();
    } catch (error) {
        console.error('Error in addPrestationToPanierAsync:', error);
        throw error;
    }

}

const deletePrestationFromPanierUser = (id_user,id_prestation, callback) => {

    deletePrestationFromPanierUserAsync(id_user,id_prestation)
        .then(res => {
            callback(null, "success");
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

const getPanierByUserId = (id, callback) => {
    getPanierByUserIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

const getAllCreneaux = (callback) => {
    getAllCreneauxAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

const addPrestationToPanier = (id_user, id_prestation, id_creneau, quantite, callback) => {
    addPrestationToPanierAsync(id_user, id_prestation, id_creneau, quantite)
        .then(res => {
            callback(null, "add successfully");
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getPanierByUserId: getPanierByUserId,
    deletePrestationFromPanierUser : deletePrestationFromPanierUser,
    getAllCreneaux : getAllCreneaux,
    addPrestationToPanier : addPrestationToPanier
}