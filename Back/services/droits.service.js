const pool = require("../database/db");

const getDroits = (id, callback) => {
    getDroitsAsync(id)
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

async function getDroitsAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT droits.libelle\n" +
            "FROM role_droits\n" +
            "LEFT JOIN droits ON role_droits.id_droit = droits.id\n" +
            "WHERE role_droits.id_role=$1\n" +
            ";",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getDroitsAsync:', error);
        throw error;
    }
}

module.exports = {
    getDroits: getDroits
}