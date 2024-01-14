const validator = require('validator');
const pool = require("../database/db");
const userServices = require("../services/users.service");

exports.validateUserInput = (req, res, next) => {
    let password = req.body.password || (req.body.user && req.body.user.password);

    if (!validator.isLength(password, {min: 8})){
        return res.status(400).send("Format incorrect : le mot de passe doit contenir au moins 8 caractères");
    }
    next();
}


exports.checkUserExists = async (req, res, next) => {
    let id = req.query.id_user || req.body.id_user;
    if (!id) {
        return res.status(400).send("ID user requis.");
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
    const id = req.query.id_user;
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

exports.checkPrestataireExists = async (req, res, next) => {
    const id = req.query.id_user;

    if (!id) {
        return res.status(400).send("ID requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM utilisateur WHERE id_user = $1 AND id_role = 2", [id]);

        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Prestataire non trouvé");
        }

        conn.release();
        next();
    } catch (error) {
        console.error('Error in checkPrestataireExists:', error);
        res.status(500).send("Internal Server Error");
    }
}


exports.checkSessionExists = async (req, res, next) => {
    const id = req.query.session_id;

    if (!id) {
        return res.status(400).send("ID session requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM session WHERE session_id = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Session non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

exports.checkEmailExists = async (req, res, next) => {
    const id_user = req.query.id_user;
    const email = req.body.email || (req.body.user && req.body.user.email);

    if (!email) {
        return res.status(400).send("Email est requis.");
    }

    try {
        const conn = await pool.connect();
        let query = id_user ? "SELECT * FROM utilisateur WHERE email = $1 AND id_user != $2" : "SELECT * FROM utilisateur WHERE email = $1";
        let queryParams = id_user ? [email, id_user] : [email];
        let checkResult = await conn.query(query, queryParams);
        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Email déjà utilisé");
        }
        query = id_user ? "SELECT * FROM utilisateurAttente WHERE email = $1 AND id_user != $2" : "SELECT * FROM utilisateurAttente WHERE email = $1";
        queryParams = id_user ? [email, id_user] : [email];
        checkResult = await conn.query(query, queryParams);
        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Email déjà utilisé");
        }
        conn.release();
        next();
    }
    catch (error) {
        console.error('Error in checkEmailExists:', error);
        res.status(500).send("Internal Server Error");
    }
}

exports.checkEmailUserCourantExists = async (req, res, next) => {
    const session_id = req.query.session_id;
    const user = await userServices.getUserBySessionIdAsync(session_id);
    const email = req.body.email;

    if (!email) {
        return res.status(400).send("Email est requis.");
    }

    try {
        const conn = await pool.connect();
        let query = "SELECT * FROM utilisateur WHERE email = $1 AND id_user != $2";
        let queryParams = [email, user.id_user];
        let checkResult = await conn.query(query, queryParams);
        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Email déjà utilisé");
        }
        query = "SELECT * FROM utilisateurAttente WHERE email = $1 AND id_user != $2";
        queryParams = [email, user.id_user];
        checkResult = await conn.query(query, queryParams);
        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Email déjà utilisé");
        }
        conn.release();
        next();
    }
    catch (error) {
        console.error('Error in checkEmailExists:', error);
        res.status(500).send("Internal Server Error");
    }
}