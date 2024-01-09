const pool = require("../database/db");

exports.checkEmplacementLogistiqueExists = async (req, res, next) => {
    const id = req.query.id_emplacement_logistique;
    if (!id) {
        return res.status(400).send("ID emplacement logistique requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM emplacement_logistique WHERE id_emplacement_logistique = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Emplacement logistique non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

exports.checkTypeEmplacementLogistiqueExists = async (req, res, next) => {
    const id = req.body.id_type_emplacement_logistique;
    if (!id) {
        return res.status(400).send("ID type emplacement logistique requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM type_emplacement_logistique WHERE id_type_emplacement_logistique = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Type emplacement logistique non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};