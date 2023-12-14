const pool = require("../database/db");
const {as} = require("pg-promise");
const getTypeEmplacementLogistique = (callback) => {
    getTypeEmplacementLogistiqueAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getTypeEmplacementLogistiqueAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query('SELECT *  FROM type_emplacement_logistique;\n');
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllDroitsAsync:', error);
        throw error;
    }
}

module.exports = {
    getTypeEmplacementLogistique: getTypeEmplacementLogistique
};