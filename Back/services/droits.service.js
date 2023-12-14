const pool = require("../database/db");
const {as} = require("pg-promise");

const getAllDroits = (callback) => {
    getAllDroitsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllDroitsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query('SELECT *  FROM droits;\n');
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllDroitsAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllDroits
}