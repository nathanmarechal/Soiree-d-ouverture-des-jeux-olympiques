const pool = require("../database/db");
const {as} = require("pg-promise");
const getEmplacementLogistique = (callback) => {
    getEmplacementLogistiqueAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getEmplacementLogistiqueAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query('SELECT *  FROM emplacement_logistique;\n');
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllDroitsAsync:', error);
        throw error;
    }
}

const addEmplacementLogistique = (body, callback) => {
    addEmplacementLogistiqueAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addEmplacementLogistiqueAsync(body) {
    try {
        const conn = await pool.connect();

        // Assuming body contains libelle, coordonnes, and id_type_emplacement_logistique
        console.log("Adding new emplacement logistique with body: ", body);

        const queryText = `
            INSERT INTO emplacement_logistique(libelle, coordonnes, id_type_emplacement_logistique)
            VALUES($1, $2, $3)
            RETURNING *;
        `;
        const result = await conn.query(queryText, [body.libelle, JSON.stringify(body.coordonnes), body.id_type_emplacement_logistique]);
        conn.release();

        return result.rows;
    } catch (error) {
        console.error('Error in addEmplacementLogistiqueAsync:', error);
        throw error;
    }
}


const deleteEmplacementLogistique = (id, callback) => {
    deleteEmplacementLogistiqueAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteEmplacementLogistiqueAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE FROM emplacement_logistique WHERE id_emplacement_logistique = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteEmplacementLogistiqueAsync:', error);
        throw error;
    }
}


const updateEmplacementLogistique = (id, body, callback) => {
    updateEmplacementLogistiqueAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateEmplacementLogistiqueAsync(id, body) {
    try {
        const conn = await pool.connect();
        console.log("id in updateEmplacementLogistiqueAsync: ", id);
        console.log("body in updateEmplacementLogistiqueAsync: ", body);

        const queryText = `
            UPDATE emplacement_logistique
            SET 
                libelle = $1, 
                id_type_emplacement_logistique = $2
            WHERE id_emplacement_logistique = $3
            RETURNING *;
        `;
        const result = await conn.query(queryText, [body.libelle, body.id_type_emplacement_logistique, id]);
        conn.release();

        return result.rows;
    } catch (error) {
        console.error('Error in updateEmplacementLogistiqueAsync:', error);
        throw error;
    }
}


module.exports = {
    getEmplacementLogistique:getEmplacementLogistique,
    addEmplacementLogistique:addEmplacementLogistique,
    deleteEmplacementLogistique:deleteEmplacementLogistique,
    updateEmplacementLogistique:updateEmplacementLogistique
}