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

const createRole = async (body, callback) => {
    try {
        let data = await createRoleAsync(body);
        callback(null, data);
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function createRoleAsync(body) {
    try {
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO role (libelle) VALUES ($1) RETURNING *", [libelle]);
        conn.release();

        return result;
    } catch (error) {
        console.error('Error in createRoleAsync:', error);
        throw error;
    }
}

const updateRole = async (body, callback) => {
    try {
        console.log("updateRole1", body);
        let data = await updateRoleAsync(body);
        console.log("updateRolereturn1", data);
        callback(null, data);
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateRoleAsync(body) {
    try {
        console.log("updateRoleAsync", body);
        const id_role = body.id_role;
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("UPDATE role SET libelle = $1 WHERE id_role = $2 RETURNING *", [libelle, id_role]);
        conn.release();
        console.log('result', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in updateRoleAsync:', error);
        throw error;
    }
}

const deleteRole = async (body, callback) => {
    try {
        console.log("deleteRole1", body);
        let data = await deleteRoleAsync(body);
        callback(null, data);
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function deleteRoleAsync(id_role) {
    try {
        const conn = await pool.connect();
        data = await conn.query('DELETE FROM role WHERE id_role = $1 RETURNING *', [id_role]);
        conn.release();
        console.log('Records deleted successfully');
        return data;
    } catch (error) {
        console.error('Error deleting records:', error);
        throw error;
    }
}

module.exports = {
    getAllRoles: getAllRoles,
    createRole: createRole,
    updateRole: updateRole,
    deleteRole: deleteRole
}
