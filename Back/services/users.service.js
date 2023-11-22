//const {v4:uuid4} = require("uuid");
const pool = require("../database/db");
const {checkRight_by_name} = require("./login.service");


const createUser = (prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand,session_id, callback) => {
    createUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand,session_id)
        .catch(
        (error)=>
        {
            console.log("threw inside createUserAsync :"+error)
            //callback(error,null);
        })
    callback(null, "success");
}

async function createUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, id_stand, session_id) {
    console.log("before droits")
    const droitsOk = await checkRight_by_name(session_id,"create_users")
    console.log("out of droits")
    if(!droitsOk)
    {
        throw "pas les droits nécessaires"
    }
    console.log("droits ok : "+droitsOk)
    try {
        const conn = await pool.connect();
        await conn.query("INSERT INTO utilisateur (email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [email, password, nom, prenom, code_postal, adresse, commune, id_role, id_stand]);
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

const updateUser = (id, nom, prenom, callback) => {
    try{
        updateUserAsync(id, nom, prenom)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateUserAsync(id, nom, prenom) {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE utilisateur SET nom = ?, prenom = ? WHERE id_user = ?", [nom, prenom, id]);
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
        const conn = await pool.getConnection();
        await conn.query('DELETE FROM USERS WHERE id = ?', [id]);
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
    , getUserWithLongestPrenom: getUserWithLongestPrenom
    , getAllRoles: getAllRoles
    , updateUser: updateUser
    , deleteUser: deleteUser
}