const pool = require("../database/db");
const usersService = require("../services/users.service");


exports.checkPrestationExists = async (req, res, next) => {
    const id = req.query.id_prestation;

    if (!id) {
        return res.status(400).send("ID prestation requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM prestation WHERE id_prestation = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Prestation non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

exports.checkIfPrestationBelongsToUserExists = async (req, res, next) => {
    const session_id = req.query.session_id;
    const id_prestation = req.query.id_prestation;
    const id_stand = req.body.id_stand;

    console.log("id_prestation", id_prestation)
    console.log("id_stand", id_stand)
    console.log("session_id", session_id)

    const user_courant = await usersService.getUserBySessionIdAsync(session_id);

    console.log("user_courant", user_courant)

    try {
        const conn = await pool.connect();

        if (id_prestation !== undefined) {
            if (!id_prestation) {
                return res.status(400).send("ID prestation requis.");
            }
            const checkResult = await conn.query("SELECT p.*\n" +
                "FROM prestation p\n" +
                "JOIN utilisateur u ON p.id_stand = u.id_stand\n" +
                "WHERE p.id_prestation = $1 AND u.id_stand = $2;", [id_prestation, user_courant.id_stand]);
            if (checkResult.rows.length === 0) {
                conn.release();
                return res.status(403).send("Cette prestation ne vous appartient pas");
            }
        }
        if (id_stand !== undefined) {
            if (id_stand !== user_courant.id_stand) {
                conn.release();
                return res.status(403).send("Ce stand ne vous appartient pas");
            }
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

exports.checkTypePrestationExists = async (req, res, next) => {
    const id = req.body.id_type_prestation;

    if (!id) {
        return res.status(400).send("ID type prestation requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM type_prestation WHERE id_type_prestation = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Type de prestation non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};