const pool = require("../database/db");

exports.checkStandExists = async (req, res, next) => {
    let id = req.query.id_stand || req.body.id_stand;
    try {

        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM stand WHERE id_stand = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Stand non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkStandAppartenance = async (req, res, next) => {
    const userId = req.query.id_user;
    const standId = req.body.id_stand;

    try {
        const conn = await pool.connect();

        const checkStand = await conn.query("SELECT * FROM stand WHERE id_stand = $1;", [standId]);
        if (checkStand.rows.length === 0) {
            conn.release();
            return res.status(404).send("Stand non trouvé");
        }

        const checkUser = await conn.query("SELECT * FROM utilisateur WHERE id_stand = $1;", [standId]);
        if (checkUser.rows.length > 0 && checkUser.rows[0].id_user != userId) {
            conn.release();
            return res.status(409).send("Le stand est déjà assigné à un autre utilisateur");
        }

        conn.release();
        next();
    } catch (error) {
        conn?.release();
        res.status(500).send("Internal Server Error");
    }
};

