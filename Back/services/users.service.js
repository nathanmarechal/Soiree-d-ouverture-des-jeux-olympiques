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
        const res = await client.query("SELECT utilisateur.id_user, id_role,email, id_stand, prenom,nom, solde,adresse,code_postal,commune " +
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

const updateUser = (id_user, prenom, nom, email, password, adresse, code_postal, commune, solde, id_role, id_stand, callback) => {
    try{
        updateUserAsync(id_user, prenom, nom, email, password, adresse, code_postal, commune,solde, id_role, id_stand)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateUserAsync(id_user, prenom, nom, email, password, adresse, code_postal, commune,solde, id_role, id_stand) {
    try {
        const conn = await pool.connect();
        let result;
        if (id_stand == null) {
            result = await conn.query(
                "UPDATE utilisateur SET email = $2, password = $3, nom = $4, prenom = $5, code_postal = $6, adresse = $7, commune = $8, solde = $9, id_role = $10 WHERE id_user = $1",
                [id_user, email, password, nom, prenom, code_postal, adresse, commune, solde, id_role]
            );
        } else {
            result = await conn.query(
                "UPDATE utilisateur SET email = $2, password = $3, nom = $4, prenom = $5, code_postal = $6, adresse = $7, commune = $8, solde = $9 id_stand = $10, id_role = $11 WHERE id_user = $1",
                [id_user, email, password, nom, prenom, code_postal, adresse, commune, solde, id_stand, id_role]
            );        
        }
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
    console.log("id = "+id)
    try {
        const conn = await pool.connect();
        await conn.query('DELETE FROM utilisateur WHERE id_user = $1', [id]);
        conn.release();
        console.log('Records deleted successfully');
    } catch (error) {
        console.error('Error deleting records:', error);
        throw error;
    }
}

const updateSolde = (id, newsolde, callback) => {
    try{
        updateSoldeAsync(id, newsolde)
            .then(res => {
                callback(null, "success");
            })
    } catch (error) {
        console.log(error);
        callback(error, null);
    }

}

async function updateSoldeAsync(id_user, newsolde) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE utilisateur SET solde = $1 WHERE id_user = $2", [newsolde, id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateSoldeAsync:', error);
        throw error;
    }
}

const updateNom = (id, nom, callback) => {
    try{
        updateNomAsync(id, nom)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateNomAsync(id_user, nom) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE utilisateur SET nom = $1 WHERE id_user = $2", [nom, id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateNomAsync:', error);
        throw error;
    }
}

const updatePrenom = (id, prenom, callback) => {
    try{
        updatePrenomAsync(id, prenom)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updatePrenomAsync(id_user, prenom) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE utilisateur SET prenom = $1 WHERE id_user = $2", [prenom, id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updatePrenomAsync:', error);
        throw error;
    }
}

const updateEmail = (id, email, callback) => {
    try{
        updateEmailAsync(id, email)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateEmailAsync(id_user, email) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE utilisateur SET email = $1 WHERE id_user = $2", [email, id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateEmailAsync:', error);
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
        console.log("deleteRole2",id_role);
        const conn = await pool.connect();
        await conn.query('DELETE FROM role WHERE id_role = $1', [id_role]);
        conn.release();
        console.log('Records deleted successfully');
    } catch (error) {
        console.error('Error deleting records:', error);
        throw error;
    }
}

const updateUserCourantWoPassword = (id_user, prenom, nom, email, adresse, code_postal, commune, callback) => {
    try{
        updateUserCourantWoPasswordAsync(id_user, prenom, nom, email, adresse, code_postal, commune)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function updateUserCourantWoPasswordAsync(id_user, prenom, nom, email, adresse, code_postal, commune) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE utilisateur SET email = $1, nom = $2, prenom = $3, code_postal = $4, adresse = $5, commune = $6   WHERE id_user = $7", [email, nom, prenom, code_postal, adresse, commune, id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateUserCourantWoPasswordAsync:', error);
        throw error;
    }
}

module.exports = {
    createUser: createUser
    , getAllUsers: getAllUsers
    , getUserById: getUserById
    , getUserBySessionId: getUserBySessionId
    , getUserWithLongestPrenom: getUserWithLongestPrenom
    , updateUser: updateUser
    , deleteUser: deleteUser
    , updateSolde: updateSolde
    , updateNom: updateNom
    , updatePrenom: updatePrenom
    , updateEmail: updateEmail
    , updateUserCourantWoPassword: updateUserCourantWoPassword
}