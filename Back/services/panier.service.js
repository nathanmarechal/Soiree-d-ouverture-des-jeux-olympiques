const pool = require("../database/db");


async function getPanierByUserIdAsync(id) {
    try {
        const conn = await pool.connect();
        console.log("id depuis getPanierByIdasync" + id)
        const result = await conn.query("SELECT * FROM ligne_panier WHERE id_user = $1;", [id]);
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