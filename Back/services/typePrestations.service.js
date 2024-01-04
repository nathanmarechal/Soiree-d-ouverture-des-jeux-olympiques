const pool = require("../database/db");

async function getAllTypePrestationsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM type_prestation");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllTypePrestationsAsync:', error);
        throw error;
    }
}

const getAllTypePrestations = (callback) => {
    getAllTypePrestationsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getAllTypePrestations: getAllTypePrestations
}