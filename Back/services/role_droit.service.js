const pool = require("../database/db");

const getAllRoleDroitAssociation = (callback) => {
    getAllRoleDroitAssociationAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllRoleDroitAssociationAsync() {
    try {
        console.log("getAllRoleDroitAssociationAsync");
        const conn = await pool.connect();
        const result = await conn.query('SELECT *  FROM role_droits;\n');
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllRoleDroitAssociationAsync:', error);
        throw error;
    }
}

const createRoleDroitAssociation = (role_droit, callback) => {
    createRoleDroitAssociationAsync(role_droit)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createRoleDroitAssociationAsync(role_droit) {
    try {
        console.log("createRoleDroitAssociationAsync", role_droit);
        const conn = await pool.connect();
        const result = await conn.query('INSERT INTO role_droits (id_role, id_droit) VALUES ($1, $2) RETURNING *;', [role_droit.id_role, role_droit.id_droit]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createRoleDroitAssociationAsync:', error);
        throw error;
    }
}

const deleteRoleDroitAssociation = (role_droit, callback) => {
    deleteRoleDroitAssociationAsync(role_droit)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteRoleDroitAssociationAsync(role_droit) {
    try {
        console.log("role_droit", role_droit);
        console.log("deleteRoleDroitAssociationAsync");
        const conn = await pool.connect();
        const result = await conn.query('DELETE FROM role_droits WHERE id_role = $1 AND id_droit = $2;', [role_droit.role_id, role_droit.droit_id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteRoleDroitAssociationAsync:', error);
        throw error;
    }
}

const deleteRoleDroitAssociationForSpecificRole = (role_droit, callback) => {
    deleteRoleDroitAssociationForSpecificRoleAsync(role_droit)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteRoleDroitAssociationForSpecificRoleAsync(id_role) {
    try {
        console.log("deleteRoleDroitAssociationForSpecificRoleAsync");
        const conn = await pool.connect();
        const result = await conn.query('DELETE FROM role_droits WHERE id_role = $1;', [id_role]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteRoleDroitAssociationForSpecificRoleAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllRoleDroitAssociation : getAllRoleDroitAssociation,
    createRoleDroitAssociation : createRoleDroitAssociation,
    deleteRoleDroitAssociation : deleteRoleDroitAssociation,
    deleteRoleDroitAssociationForSpecificRole : deleteRoleDroitAssociationForSpecificRole
}
