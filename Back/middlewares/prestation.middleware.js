const pool = require("../database/db");

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