const pool = require("../database/db");

async function getAllStandsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM stand");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllStandsAsync:', error);
        throw error;
    }

}

const getAllStands = (callback) => {
    getAllStandsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getAllStands: getAllStands
}