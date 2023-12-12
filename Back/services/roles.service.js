const pool = require("../database/db");

const getAllRoles = (callback) => {
    getAllRolesAsync()
        .then(res => {
            //console.log('Roles:', res);
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
    try{
        createRoleAsync(body)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function createRoleAsync(body) {
    try {
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO role (libelle) VALUES ($1)", [libelle]);
        conn.release();

        return result;
    } catch (error) {
        console.error('Error in createRoleAsync:', error);
        throw error;
    }
}

const updateRole = (body, callback) => {
    try{
        console.log("updateRole1",body);
        updateRoleAsync(body)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateRoleAsync(body) {
    try {
        const id_role = body.id_role;
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("UPDATE role SET libelle = $1 WHERE id_role = $2", [libelle, id_role]);
        conn.release();
        return result;
    } catch (error) {
        console.error('Error in updateRoleAsync:', error);
        throw error;
    }
}

const deleteRole = (body, callback) => {
    try{
        console.log("deleteRole1",body);
        deleteRoleAsync(body);
        callback(null,"Deleted successfully")
    }
    catch (error)
    {
        console.log(error);
        callback(error,null)
    }
}

async function deleteRoleAsync(id_role) {
    try {
        const conn = await pool.connect();
        await conn.query('DELETE FROM role WHERE id_role = $1', [id_role]);
        conn.release();
        console.log('Records deleted successfully');
    } catch (error) {
        console.error('Error deleting records:', error);
        throw error;
    }
}

module.exports = {
    getAllRoles: getAllRoles
    , createRole: createRole
    , updateRole: updateRole
    , deleteRole: deleteRole
}