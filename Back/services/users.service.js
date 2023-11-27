//const {v4:uuid4} = require("uuid");
const pool = require("../database/db");


const createUser = (prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand, callback) => {
    createUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand)
        .catch(
        (error)=>
        {
            console.log("threw inside createUserAsync :"+error)
            //callback(error,null);
        })
    callback(null, "success");
}

async function createUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand) {
    try {
        const conn = await pool.connect();
        await conn.query("INSERT INTO utilisateur (email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role]);
        conn.release();
    } catch (error) {
        console.error('Error in createUserAsync:', error);
        throw error;
    }
}

const getAllUsers = (callback) => {
    getAllUsersAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllUsersAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM utilisateur");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllUsersAsync:', error);
        throw error;
    }
}

const getUserById = (id, callback) => {
    getUserByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback('Error in getUserById', null);
        })
}

async function getUserByIdAsync(id) {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT * FROM utilisateur WHERE id_user = $1", [id]);
        client.release();
        return res.rows;
    } catch (error) {
        console.error('Error in getUserByIdAsync:', error);
        throw error;
    }
}

const getUserBySessionId = (session_id, callback) => {
    getUserBySessionIdAsync(session_id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback('Error in getUserBySessionId', null);
        })
}

async function getUserBySessionIdAsync(session_id) {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT utilisateur.id_user, id_role,email,prenom,nom,adresse,code_postal,commune " +
            "FROM session\n" +
            "LEFT JOIN utilisateur on session.id_user = utilisateur.id_user\n" +
            "WHERE session_id = $1;", [session_id]);
        client.release();
        if(res.rows.length!=1)
        {
            console.log("row length : "+res.rows.length);
            return null;
        }
        return res.rows[0];
    } catch (error) {
        console.error('Error in getUserBySessionIdAsync:', error);
        throw error;
    }
}

const getUserWithLongestPrenom = (callback) => {
    getUserWithLongestPrenomAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getUserWithLongestPrenomAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM utilisateur WHERE LENGTH(prenom) = (SELECT MAX(LENGTH(prenom)) FROM utilisateur)");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getUserWithLongestPrenomAsync:', error);
        throw error;
    }
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

const updateUser = (prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand, callback) => {
    try{
        updateUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateUserAsync(id, prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(
            "UPDATE utilisateur SET email = $2, password = $3, nom = $4, prenom = $5, code_postal = $6, adresse = $7, commune = $8, id_stand = $9, id_role = $10 WHERE id_user = $1",
            [id, email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role]
        );        
        conn.release();
        return result;
    } catch (error) {
        console.error('Error in updateUserAsync:', error);
        throw error;
    }
}



const deleteUser = (id, callback) => {
    try
    {
        deleteUserAsync(id);
        callback(null,"Deleted successfully")
    }
    catch (error)
    {
        console.log(error);
        callback(error,null)
    }
}

async function deleteUserAsync(id) {
    try {
        const conn = await pool.connect();
        await conn.query('DELETE FROM USERS WHERE id = ?', [id]);
        conn.release();
        console.log('Records deleted successfully');
    } catch (error) {
        console.error('Error deleting records:', error);
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
        const id_role = body.id_role;
        const libelle = body.libelle;
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO role (id_role, libelle) VALUES ($1, $2)", [id_role, libelle]);
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
    createUser: createUser
    , getAllUsers: getAllUsers
    , getUserById: getUserById
    , getUserBySessionId: getUserBySessionId
    , getUserWithLongestPrenom: getUserWithLongestPrenom
    , getAllRoles: getAllRoles
    , updateUser: updateUser
    , deleteUser: deleteUser
    , createRole: createRole
    , updateRole: updateRole
    , deleteRole: deleteRole
}