const pool = require("../database/db");


const createUser = (prenom, nom, email, password, adresse, code_postal, commune, id_role, callback) => {
    createUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role)
        .catch(
        (error)=>
        {
            console.log("threw inside createUserAsync :"+error)
            //callback(error,null);
        })
    callback(null, "success");
}

async function createUserAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role) {
    try {
        const conn = await pool.connect();
        await conn.query("INSERT INTO utilisateur (email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role,solde) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,0)", [email, password, nom, prenom, code_postal, adresse, commune, null, id_role]);
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

/*
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
 */

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
    try {
        deleteUserAsync(id);
        callback(null,"Deleted successfully")
    }
    catch (error) {
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

const updateUserCourantWoPassword = (id_user, prenom, nom, email, adresse, code_postal, commune, callback) => {
    try{
        console.log("updateUserCourantWoPasswordServlce",id_user, prenom, nom, email, adresse, code_postal, commune)
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

const createUserWithStand =  (prenom, nom, email, password, adresse, code_postal, commune, id_role, nom_stand, image_stand, description_stand, prix, id_emplacement, callback) => {
    console.log(description_stand)
    console.log(id_emplacement + "eeessees2")
    createUserWithStandAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, nom_stand, image_stand, description_stand, prix, id_emplacement)
        .catch(
        (error)=>
        {
            console.log("threw inside createUserAsync :"+error)
            //callback(error,null);
        })
    callback(null, "success");
}

async function createUserWithStandAsync(prenom, nom, email, password, adresse, code_postal, commune, id_role, nom_stand, image_stand, description_stand, prix, id_emplacement) {
    console.log(id_emplacement + "eeessees3")
    console.log('Parameters:', prenom, nom, email, password, adresse, code_postal, commune, id_role, nom_stand, image_stand, description_stand, prix, id_emplacement);
    try {
        id_stand = await createStandAsync(nom_stand, image_stand, description_stand, prix, id_emplacement);
        console.log(nom_stand, image_stand, description_stand, prix)
        console.log("id_stand = " + id_stand)
        const conn = await pool.connect();
        await conn.query("INSERT INTO utilisateurAttente (email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role,solde) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,0)", [email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role]);
        conn.release();
    } catch (error) {
        console.error('Error in createUserAsync:', error);
        throw error;
    }
}

async function createStandAsync(nom_stand, image_stand, description_stand, prix, id_emplacement) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(
            "INSERT INTO standAttente (nom_stand, image_stand, description_stand, date_achat, prix, id_emplacement) VALUES ($1, $2, $3, CURRENT_DATE, $4, $5) RETURNING id_stand", [nom_stand, image_stand, description_stand, prix, id_emplacement]
        );
        conn.release();
        return result.rows[0].id_stand;
    } catch (error) {
        console.error('Error in createStandAsync:', error);
        throw error;
    }
}

const getAllUsersAttente = (callback) => {
    getAllUsersAttenteAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllUsersAttenteAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM utilisateurAttente");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllUsersAttenteAsync:', error);
        throw error;
    }
}

const acceptUser = (id_user, callback) => {
    try{
        acceptUserAsync(id_user)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function acceptUserAsync(id_user) {
    try {
        const conn = await pool.connect();
        const resultUser = await conn.query("SELECT * FROM utilisateurAttente WHERE id_user = $1", [id_user]);
        const user = resultUser.rows[0];
        const resultStand = await conn.query("SELECT * FROM standAttente WHERE id_stand = $1", [user.id_stand]);
        const stand = resultStand.rows[0];
        console.log("stand : ", stand)
        await conn.query("INSERT INTO stand (nom_stand, image_stand, description_stand, date_achat, prix, id_emplacement) VALUES ($1, $2, $3, CURRENT_DATE, $4, $5) RETURNING id_stand", [stand.nom_stand, stand.image_stand, stand.description_stand, stand.prix, stand.id_emplacement]);
        await conn.query("DELETE FROM standAttente WHERE id_stand = $1", [user.id_stand])
        const result = await conn.query("INSERT INTO utilisateur (email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role, solde) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [user.email, user.password, user.nom, user.prenom, user.code_postal, user.adresse, user.commune, user.id_stand, user.id_role, user.solde]);
        await conn.query("DELETE FROM utilisateurAttente WHERE id_user = $1", [id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in acceptUserAsync:', error);
        throw error;
    }
}

const refuseUser = (id_user, callback) => {
    try{
        refuseUserAsync(id_user)
        callback(null, "success");
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

async function refuseUserAsync(id_user) {
    try {
        const conn = await pool.connect();
        const resultUser = await conn.query("SELECT * FROM utilisateurAttente WHERE id_user = $1", [id_user]);
        const user = resultUser.rows[0];
        await conn.query("DELETE FROM standAttente WHERE id_stand = $1", [user.id_stand])
        await conn.query("DELETE FROM utilisateurAttente WHERE id_user = $1", [id_user]);
        conn.release();
    } catch (error) {
        console.error('Error in refuseUserAsync:', error);
        throw error;
    }

}

module.exports = {
    createUser: createUser
    , getAllUsers: getAllUsers
    , getUserById: getUserById
    , getUserBySessionId: getUserBySessionId
  //, getUserWithLongestPrenom: getUserWithLongestPrenom
    , updateUser: updateUser
    , deleteUser: deleteUser
    , updateSolde: updateSolde
    , updateNom: updateNom
    , updatePrenom: updatePrenom
    , updateEmail: updateEmail
    , updateUserCourantWoPassword: updateUserCourantWoPassword
    , createUserWithStand: createUserWithStand
    , getAllUsersAttente: getAllUsersAttente
    , acceptUser: acceptUser
    , refuseUser: refuseUser
}