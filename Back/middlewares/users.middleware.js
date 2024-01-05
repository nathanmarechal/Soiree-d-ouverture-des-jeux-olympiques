const validator = require('validator');
const pool = require("../database/db");
const {finalize} = require("swagger-jsdoc/src/specification");

exports.validateUserInput = (req, res, next) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;

    if(!nom || !prenom){
        return res.status(400).send("nom et prenom sont nulles!");
    }
    if (!validator.isLength(nom, {min: 3}) || !validator.isAlpha(nom,'en-US', {ignore: " "})){
        return res.status(400).send("Format incorrect");
    }
    if (!validator.isLength(prenom, {min: 3}) || !validator.isAlpha(prenom,'en-US', {ignore: " "})){
        return res.status(400).send("Format incorrect");
    }
    next();
}


exports.checkUserExists = async (req, res, next) => {
    const id_params = req.params.id;
    const id_query = req.query.id_user;
    const id_body = req.body.id_user;
    let id = null;
    if (id_params != null) {
        id = id_params;
    }
    else if (id_query != null) {
        id = id_query;
    }
    else if (id_body != null) {
        id = id_body;
    }

    if (!id) {
        return res.status(400).send("ID requis.");
    }

    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM utilisateur WHERE id_user = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Utilisateur non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkUserAttenteExists = async (req, res, next) => {
    const id = req.params.id;
    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM utilisateurAttente WHERE id_user = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Utilisateur non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkSessionExists = async (req, res, next) => {
    const id = req.query.session_id;

    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM session WHERE session_id = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Session non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkEmailExists = async (req, res, next) => {
    let id = req.params.id || req.query.id_user || req.body.id_user || (req.body.user && req.body.user.id_user);
    let email = req.body.email || (req.body.user && req.body.user.email);

    console.log("id = " + id);
    console.log("email = " + email);

    if (!email) {
        return res.status(400).send("Email est requis.");
    }

    try {
        const conn = await pool.connect();

        let query = id ? "SELECT * FROM utilisateur WHERE email = $1 AND id_user != $2" : "SELECT * FROM utilisateur WHERE email = $1";
        let queryParams = id ? [email, id] : [email];

        let checkResult = await conn.query(query, queryParams);

        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Email déjà utilisé");
        }

        query = id ? "SELECT * FROM utilisateurAttente WHERE email = $1 AND id_user != $2" : "SELECT * FROM utilisateurAttente WHERE email = $1";
        queryParams = id ? [email, id] : [email];

        checkResult = await conn.query(query, queryParams);

        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Email déjà utilisé");
        }

        conn.release();
        next();
    } catch (error) {
        console.error('Error in checkEmailExists:', error);
        res.status(500).send("Internal Server Error");
    }
}
