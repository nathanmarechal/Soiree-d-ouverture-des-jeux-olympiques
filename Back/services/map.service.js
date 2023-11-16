//const {v4:uuid4} = require("uuid");
const pool = require("../database/db");


const getAllAreas = (callback) => {
    getAllAreasAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllAreasAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM emplacement");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllAreasAsync:', error);
        throw error;
    }
}


module.exports = {
    getAllAreas: getAllAreas
}