const pool = require("../database/db");

async function getAllPrestationsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM prestation");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllPrestationsAsync:', error);
        throw error;
    }
}

const getAllPrestations = (callback) => {
    getAllPrestationsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getPrestationByUserIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT p.id_prestation, p.libelle, p.prix, p.image, p.id_type_prestation, tp.libelle as \"type_prestation_libelle\", COUNT(lc.id_prestation) as \"nb_ventes\", s.id_stand, s.nom_stand\n" +
            "FROM utilisateur u\n" +
            "JOIN stand s on u.id_stand = s.id_stand\n" +
            "JOIN prestation p on s.id_stand = p.id_stand\n" +
            "JOIN type_prestation tp on tp.id_type_prestation = p.id_type_prestation\n" +
            "LEFT JOIN ligne_commande lc on p.id_prestation = lc.id_prestation\n" +
            "WHERE u.id_user = $1\n" +
            "GROUP BY p.id_prestation, p.libelle, p.prix, p.image, p.id_type_prestation, p.id_stand, tp.libelle , s.id_stand, s.nom_stand\n" +
            "ORDER BY p.id_type_prestation;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getPrestationByUserIdAsync:', error);
        throw error;
    }
}

const getPrestationByUserId = (id, callback) => {
    getPrestationByUserIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getAllPrestations: getAllPrestations,
    getPrestationByUserId: getPrestationByUserId
}