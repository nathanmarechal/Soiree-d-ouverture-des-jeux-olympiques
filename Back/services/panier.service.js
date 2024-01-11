const pool = require("../database/db");


async function getPanierByUserIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT Ligne_panier.id_user ,p.id_prestation,c.id_creneau, c.heure_creneau, p.libelle, p.prix,quantite, p.image, tp.id_type_prestation, tp.libelle as type_prestation_libelle FROM ligne_panier JOIN prestation p on p.id_prestation = ligne_panier.id_prestation JOIN type_prestation tp on tp.id_type_prestation = p.id_type_prestation JOIN creneau c on c.id_creneau = ligne_panier.id_creneau WHERE id_user = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getPanierByUserIdAsync:', error);
        throw error;
    }
}

async function deletePrestationFromPanierUserAsync(id_user, id_prestation, id_creneau) {
    try {
        const conn = await pool.connect();
        await conn.query("DELETE FROM ligne_panier WHERE id_user = $1 AND id_prestation = $2 and id_creneau = $3;", [id_user, id_prestation, id_creneau]);
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

async function updateQuantityInPanierAsync(id_user, id_prestation, quantite, id_creneau) {
    try {
        const conn = await pool.connect();
        await conn.query("UPDATE ligne_panier SET quantite = $1 WHERE id_user = $2 AND id_prestation = $3 AND id_creneau = $4;", [quantite, id_user, id_prestation, id_creneau]);
        conn.release();
    } catch (error) {
        console.error('Error in updateQuantityInPanierAsync:', error);
        throw error;
    }
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

const updateQuantityInPanier = (id_user, id_prestation,  quantite, id_creneau, callback) => {
    updateQuantityInPanierAsync(id_user, id_prestation, quantite , id_creneau)
        .then(res => {
            callback(null, "success");
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

const deletePrestationFromPanierUser = (id_user,id_prestation,id_creneau, callback) => {
    deletePrestationFromPanierUserAsync(id_user,id_prestation, id_creneau)
        .then(res => {
            callback(null, "success");
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
    addPrestationToPanier : addPrestationToPanier,
    updateQuantityInPanier : updateQuantityInPanier
}