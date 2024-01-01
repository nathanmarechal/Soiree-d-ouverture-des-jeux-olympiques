const pool = require("../database/db");
const {as} = require("pg-promise");

const getAvisByIdStand = (id, callback) => {
    getAvisByIdStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAvisByIdStandAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("select * from avis_stand_utilisateur where id_stand = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getCommandesPrestatairesAsync:', error);
        throw error;
    }
}

const addAvis = (avis, callback) => {
    addAvisAsync(avis)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addAvisAsync(avis) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("insert into avis_stand_utilisateur (id_stand, id_user, note, commentaire) values ($1, $2, $3, $4);", [avis.id_stand, avis.id_user, avis.note, avis.commentaire]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in addAvisAsync:', error);
        throw error;
    }
}

const deleteAvis = (id, callback) => {
    deleteAvisAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteAvisAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("delete from avis_stand_utilisateur where id_avis_stand_utilisateur = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteAvisAsync:', error);
        throw error;
    }
}

module.exports = {
    getAvisByIdStand : getAvisByIdStand
    ,addAvis : addAvis
    ,deleteAvis : deleteAvis
}