const pool = require("../database/db");

exports.checkEmplacementExists = async (req, res, next) => {
    const id_emplacement_query = req.query.id_emplacement;
    const id_emplacement_body = req.body.id_emplacement || (req.body.stand && req.body.stand.id_emplacement);
    const id_emplacement = id_emplacement_query || id_emplacement_body;
    const id_stand = req.query.id_stand

    if (!id_emplacement) {
        return res.status(400).send("ID emplacement requis.");
    }

    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT e.*, s.id_stand FROM emplacement e LEFT JOIN stand s ON e.id_emplacement = s.id_emplacement WHERE e.id_emplacement = $1", [id_emplacement]);

        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Emplacement non trouvé");
        } else if (checkResult.rows[0].id_stand != null && id_emplacement_body) {
            if (id_stand){
                if (id_stand != checkResult.rows[0].id_stand){
                    conn.release();
                    return res.status(409).send("Un stand est déjà présent sur cet emplacement");
                }
            }
            else{
                conn.release();
                return res.status(409).send("Un stand est déjà présent sur cet emplacement");
            }
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkZoneExists = async (req, res, next) => {
    const id = req.body.id_zone || req.query.id_zone;

    if (!id) {
        return res.status(400).send("ID zone requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM zone WHERE id_zone = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Zone non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

exports.checkTypeZoneExists = async (req, res, next) => {
    const id = req.body.id_type_zone;

    if (!id) {
        return res.status(400).send("ID type zone requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM type_zone WHERE id_type_zone = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Type de zone non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};