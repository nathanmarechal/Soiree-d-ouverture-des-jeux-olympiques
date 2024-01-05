const pool = require("../database/db");

exports.checkEmplacementExists = async (req, res, next) => {
    const id = req.body.stand.id_emplacement;

    if (!id) {
        return res.status(400).send("ID emplacement requis.");
    }

    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT e.*, s.id_stand FROM emplacement e LEFT JOIN stand s ON e.id_emplacement = s.id_emplacement WHERE e.id_emplacement = $1", [id]);

        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Emplacement non trouvé");
        } else if (checkResult.rows[0].id_stand != null) {
            conn.release();
            return res.status(409).send("Un stand est déjà présent sur cet emplacement");
        }

        conn.release();
        next();
    } catch (error) {
        console.error('Error in checkEmplacementExists:', error);
        res.status(500).send("Internal Server Error");
    }
}
