const pool = require("../database/db");


async function getPanierByUserIdAsync(id) {
    try {
        const conn = await pool.connect();
        console.log("id depuis getPanierByIdasync" + id)
        const result = await conn.query("SELECT Ligne_panier.id_user ,p.id_prestation, p.libelle, p.prix,quantite, p.image, tp.id_type_prestation, tp.libelle as type_prestation_libelle FROM ligne_panier JOIN prestation p on p.id_prestation = ligne_panier.id_prestation JOIN type_prestation tp on tp.id_type_prestation = p.id_type_prestation WHERE id_user = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getPanierByUserIdAsync:', error);
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

module.exports = {
    getPanierByUserId: getPanierByUserId
}