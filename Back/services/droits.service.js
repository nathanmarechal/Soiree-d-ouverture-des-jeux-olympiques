const pool = require("../database/db");
const {as} = require("pg-promise");
const getDroitsById = (id, callback) => {
    getDroitsByIdAsync(id)
        .then(res => {
            let array = [res.length]
            for (let i = 0; i < res.length; i++) {
                array[i] = res[i].libelle;
            }
            callback(null, array);
        })
        .catch(error => {
            console.log(error);
            callback('Error in getUserById', null);
        })
}

async function getDroitsByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT droits.libelle\n" +
            "FROM role_droits\n" +
            "LEFT JOIN droits ON role_droits.id_droit = droits.id\n" +
            "WHERE role_droits.id_role=$1\n" +
            ";", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getDroitsAsync:', error);
    }
}

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
    getDroits: getDroitsById,
    getAllDroits: getAllDroits
};