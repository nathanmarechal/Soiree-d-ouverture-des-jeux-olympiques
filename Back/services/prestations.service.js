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

module.exports = {
    getAllPrestations: getAllPrestations,
}