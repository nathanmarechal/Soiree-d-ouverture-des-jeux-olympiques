const pool = require("../database/db");

const getAllRoles = (callback) => {
    getAllRolesAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.error('Error in getAllRoles:', error);
            callback(error, null);
        });
}

async function getAllRolesAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM role");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllRolesAsync:', error);
        throw error;
    }
}

const createRole = (body, callback) => {
    createRoleAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.error('Error in createRole:', error);
            callback(error, null);
        });
}

async function createRoleAsync(body) {
    try {
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO role (libelle) VALUES ($1) RETURNING *", [libelle]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createRoleAsync:', error);
        throw error;
    }
}

const updateRole = (id, body, callback) => {
    updateRoleAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.error('Error in updateRole:', error);
            callback(error, null);
        });
}

async function updateRoleAsync(id, body) {
    try {
        const id_role = id;
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("UPDATE role SET libelle = $1 WHERE id_role = $2 RETURNING *", [libelle, id_role]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateRoleAsync:', error);
        throw error;
    }
}

const deleteRole = (body, callback) => {
    deleteRoleAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.error('Error in deleteRole:', error);
            callback(error, null);
        });
}
async function deleteRoleAsync(id_role) {
    try {
        const conn = await pool.connect();
        data = await conn.query('DELETE FROM role WHERE id_role = $1', [id_role]);
        conn.release();
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllRoles: getAllRoles,
    createRole: createRole,
    updateRole: updateRole,
    deleteRole: deleteRole
}
